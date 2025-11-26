import React, { useState } from 'react';
import { Search, MapPin, Cloud } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';

interface AddressForm {
  street: string;
  city: string;
  state: string;
  zip: string;
}

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
  const [address, setAddress] = useState<AddressForm>({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [forecast, setForecast] = useState<DayForecast[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock forecast data - replace with your API call
  const mockForecast: DayForecast[] = [
    { 
      day: 'Monday', 
      date: 'Nov 25', 
      dayForecast: { high: 72, low: 58, condition: 'Sunny', icon: 'sun' }, 
      eveningForecast: { high: 62, low: 54, condition: 'Clear', icon: 'sun' } 
    },
    { 
      day: 'Tuesday', 
      date: 'Nov 26', 
      dayForecast: { high: 68, low: 55, condition: 'Partly Cloudy', icon: 'cloud' }, 
      eveningForecast: { high: 58, low: 50, condition: 'Cloudy', icon: 'cloud' } 
    },
    { 
      day: 'Wednesday', 
      date: 'Nov 27', 
      dayForecast: { high: 65, low: 52, condition: 'Rainy', icon: 'rain' }, 
      eveningForecast: { high: 55, low: 48, condition: 'Light Rain', icon: 'rain' } 
    },
    { 
      day: 'Thursday', 
      date: 'Nov 28', 
      dayForecast: { high: 70, low: 56, condition: 'Sunny', icon: 'sun' }, 
      eveningForecast: { high: 60, low: 52, condition: 'Clear', icon: 'sun' } 
    },
    { 
      day: 'Friday', 
      date: 'Nov 29', 
      dayForecast: { high: 73, low: 59, condition: 'Sunny', icon: 'sun' }, 
      eveningForecast: { high: 63, low: 55, condition: 'Clear', icon: 'sun' } 
    },
    { 
      day: 'Saturday', 
      date: 'Nov 30', 
      dayForecast: { high: 69, low: 54, condition: 'Cloudy', icon: 'cloud' }, 
      eveningForecast: { high: 57, low: 49, condition: 'Cloudy', icon: 'cloud' } 
    },
    { 
      day: 'Sunday', 
      date: 'Dec 1', 
      dayForecast: { high: 66, low: 51, condition: 'Windy', icon: 'wind' }, 
      eveningForecast: { high: 56, low: 46, condition: 'Windy', icon: 'wind' } 
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Replace with your actual API call
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   body: JSON.stringify(address)
    // });
    // const data = await response.json();
    
    // Simulate API call
    setTimeout(() => {
      setForecast(mockForecast);
      setLoading(false);
    }, 800);
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
              <span>
                {address.street}, {address.city}, {address.state} {address.zip}
              </span>
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