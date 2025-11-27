import { useState } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, CloudDrizzle, Moon } from 'lucide-react';

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

interface WeatherCardProps {
  dayForecast: DayForecast;
}

export function WeatherCard({ dayForecast }: WeatherCardProps) {
  const [showDayDetails, setShowDayDetails] = useState(false);
  const [showEveningDetails, setShowEveningDetails] = useState(false);

  const getWeatherIcon = (iconName: string, isEvening: boolean = false) => {
    const iconClass = "w-10 h-10 mx-auto";
    switch (iconName) {
      case 'sun':
        return isEvening ? <Moon className={iconClass} /> : <Sun className={iconClass} />;
      case 'cloud':
        return <Cloud className={iconClass} />;
      case 'rain':
        return <CloudRain className={iconClass} />;
      case 'snow':
        return <CloudSnow className={iconClass} />;
      case 'wind':
        return <Wind className={iconClass} />;
      default:
        return <CloudDrizzle className={iconClass} />;
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/70 rounded-2xl shadow-2xl border border-white/90 overflow-hidden hover:scale-105 transition-transform">
      {/* Header - Day and Date */}
      <div className="text-center py-3 bg-white/30 border-b border-slate-200">
        <p className="text-slate-800">{dayForecast.day}</p>
        <p className="text-slate-600 text-sm">{dayForecast.date}</p>
      </div>

      {/* Day Section - Sky blue gradient */}
      <div 
        className="relative bg-gradient-to-b from-sky-400 to-sky-200 p-4 border-b border-white/30 h-40 cursor-pointer"
        onMouseEnter={() => setShowDayDetails(true)}
        onMouseLeave={() => setShowDayDetails(false)}
      >
        {/* Decorative sun rays effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_50%)]" />
        
        {!showDayDetails ? (
          <div className="relative text-center h-full flex flex-col justify-center">
            <p className="text-sky-900/70 text-xs mb-2 uppercase tracking-wide">Day</p>
            <div className="text-yellow-400 mb-2">
              {getWeatherIcon(dayForecast.dayForecast.icon, false)}
            </div>
            <p className="text-sky-900 text-sm mb-2 line-clamp-1">{dayForecast.dayForecast.condition}</p>
            <div className="flex justify-center items-center gap-2">
              <span className="text-sky-900">{dayForecast.dayForecast.high}°</span>
              <span className="text-sky-700">{dayForecast.dayForecast.low}°</span>
            </div>
          </div>
        ) : (
          <div className="relative h-full overflow-y-auto px-2">
            <p className="text-sky-900/70 text-xs mb-1 uppercase tracking-wide">Day Details</p>
            <p className="text-sky-900 text-xs leading-relaxed">{dayForecast.dayForecast.condition}</p>
          </div>
        )}
      </div>

      {/* Evening Section - Night sky gradient */}
      <div 
        className="relative bg-gradient-to-b from-indigo-900 to-purple-900 p-4 h-40 cursor-pointer"
        onMouseEnter={() => setShowEveningDetails(true)}
        onMouseLeave={() => setShowEveningDetails(false)}
      >
        {/* Decorative stars effect */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                           radial-gradient(2px 2px at 60% 70%, white, transparent),
                           radial-gradient(1px 1px at 50% 50%, white, transparent),
                           radial-gradient(1px 1px at 80% 10%, white, transparent),
                           radial-gradient(2px 2px at 90% 60%, white, transparent),
                           radial-gradient(1px 1px at 33% 80%, white, transparent)`,
          backgroundSize: '200% 200%',
          backgroundPosition: '50% 50%'
        }} />
        
        {!showEveningDetails ? (
          <div className="relative text-center h-full flex flex-col justify-center">
            <p className="text-indigo-300/70 text-xs mb-2 uppercase tracking-wide">Evening</p>
            <div className="text-blue-200 mb-2">
              {getWeatherIcon(dayForecast.eveningForecast.icon, true)}
            </div>
            <p className="text-indigo-100 text-sm mb-2 line-clamp-1">{dayForecast.eveningForecast.condition}</p>
            <div className="flex justify-center items-center gap-2">
              <span className="text-white">{dayForecast.eveningForecast.high}°</span>
              <span className="text-indigo-300">{dayForecast.eveningForecast.low}°</span>
            </div>
          </div>
        ) : (
          <div className="relative h-full overflow-y-auto px-2">
            <p className="text-indigo-300/70 text-xs mb-1 uppercase tracking-wide">Evening Details</p>
            <p className="text-indigo-100 text-xs leading-relaxed">{dayForecast.eveningForecast.condition}</p>
          </div>
        )}
      </div>
    </div>
  );
}