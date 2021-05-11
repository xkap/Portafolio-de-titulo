using MantenedoresSigloXXI.Models;

namespace MantenedoresSigloXXI.Contracts.Services
{
    public interface IThemeSelectorService
    {
        bool SetTheme(AppTheme? theme = null);

        AppTheme GetCurrentTheme();
    }
}
