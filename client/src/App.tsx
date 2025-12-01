import React, { useState } from 'react';
import { Search, MapPin, Cloud } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { ValidationErrorDisplay } from './components/ErrorDisplay';
import type { Forecast, AddressRequest} from './types/Forecast';
import type { ValidationError } from './types/Errors';
import { GetForecast } from './utils/GetForecast';

interface DayForecast {
  day: string;
  date: string;
  dayForecast: {
    high: number;
    low: number;
    condition: string;
    icon: string;
  };
  eveningForecast: {
    high: number;
    low: number;
    condition: string;
    icon: string;
  };
}

export default function App() {
  const [address, setAddress] = useState<AddressRequest>({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [forecast, setForecast] = useState<DayForecast[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [displayAddress, setDisplayAddress] = useState<string>('');
  const [error, setError] = useState<ValidationError | null>(null);

  // Transform API response into DayForecast format
  const transformForecastData = (apiResponse: Forecast): DayForecast[] => {
    const periods = apiResponse.data.periods;
    const dayForecasts: DayForecast[] = [];

    // Group periods into day/night pairs
    for (let i = 0; i < Math.min(periods.length, 14); i += 2) {
      const dayPeriod = periods[i];
      const nightPeriod = periods[i + 1] || dayPeriod; // fallback to day if no night

      // Extract day name (remove "This " prefix if present)
      let dayName = dayPeriod.name.replace('This ', '');
      
      // Generate a simple date format
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(i / 2));
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      dayForecasts.push({
        day: dayName,
        date: dateStr,
        dayForecast: {
          high: dayPeriod.temperature,
          low: nightPeriod.temperature,
          condition: dayPeriod.shortForecast,
          icon: dayPeriod.conditions.toLowerCase()
        },
        eveningForecast: {
          high: dayPeriod.temperature,
          low: nightPeriod.temperature,
          condition: nightPeriod.shortForecast,
          icon: nightPeriod.conditions.toLowerCase()
        }
      });
    }

    return dayForecasts.slice(0, 7); // Return only 7 days
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await fetch('http://localhost:5133/api/forecast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip
        })
      });
      
      if (!response.ok) {
        //
        if (response.status === 400) {
          const errorData: ValidationError = await response.json();
          setError(errorData);
          return;
        } else if (response.status === 422) {
          const errorData: { error: string } = await response.json();
          alert(`An error occurred withy your request: ${errorData.error}`);
          setAddress({
            street: '',
            city: '',
            state: '',
            zip: ''
          });
          return;
        }
      }
      
      const data: Forecast = await response.json();
      console.log('API Response:', data);
      const transformedData = transformForecastData(data);
      setForecast(transformedData);
      setDisplayAddress(data.address);
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <h1 className="text-slate-800 mb-2 flex items-center justify-center gap-3">
            <Cloud className="w-10 h-10" />
            Weather Forecast
          </h1>
          <p className="text-slate-600">Enter your address to view the 7-day forecast</p>
        </div>

        {error && <div className="pl-5 pr-5 pb-5"><ValidationErrorDisplay error={error as ValidationError} /></div>}
        {/* Input Card - Glassmorphic */}
        <div className="backdrop-blur-lg bg-white/60 rounded-3xl p-6 md:p-8 shadow-2xl border border-white/80 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={address.street}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={address.zip}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Get Forecast
                </>
              )}
            </button>
          </form>
        </div>

        {/* 7-Day Forecast */}
        {forecast && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-5 h-5" />
              <span>{displayAddress || `${address.street}, ${address.city}, ${address.state} ${address.zip}`}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {forecast.map((day, index) => (
                <WeatherCard key={index} dayForecast={day} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}