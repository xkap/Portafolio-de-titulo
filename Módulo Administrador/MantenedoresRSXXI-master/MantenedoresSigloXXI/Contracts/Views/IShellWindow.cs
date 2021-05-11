using System.Windows.Controls;

namespace MantenedoresSigloXXI.Contracts.Views
{
    public interface IShellWindow
    {
        Frame GetNavigationFrame();

        void ShowWindow();

        void CloseWindow();
    }
}
