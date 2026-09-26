import { useTheme, themes, Theme } from '../contexts/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg">
      <h3 className="font-black text-gray-800 mb-3 text-sm">🎨 Choose Theme</h3>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(themes) as Theme[]).map((themeKey) => {
          const themeConfig = themes[themeKey];
          const isActive = theme === themeKey;
          
          return (
            <button
              key={themeKey}
              onClick={() => setTheme(themeKey)}
              className={`p-3 rounded-xl border-2 transition-all ${
                isActive
                  ? 'border-purple-500 bg-purple-50 scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{themeConfig.emoji}</div>
              <div className="text-xs font-bold text-gray-700">{themeConfig.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
