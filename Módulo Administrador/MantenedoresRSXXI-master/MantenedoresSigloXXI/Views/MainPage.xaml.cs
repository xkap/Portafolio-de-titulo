using System;
using System.Windows.Controls;
using System.Windows.Threading;
using MantenedoresSigloXXI.ViewModels;

namespace MantenedoresSigloXXI.Views
{
    public partial class MainPage : Page
    {
        public MainPage(MainViewModel viewModel)
        {
            InitializeComponent();
            DataContext = viewModel;
            myDateTime.Text = DateTime.Now.ToString("dddd , MMM dd yyyy,hh:mm:ss");
            DispatcherTimer LiveTime = new DispatcherTimer();
            LiveTime.Interval = TimeSpan.FromSeconds(1);
            LiveTime.Tick += timer_Tick;
            LiveTime.Start();
        }

        void timer_Tick(object sender, EventArgs e)
        {
            myDateTime.Text = DateTime.Now.ToString("dddd , MMM dd yyyy,hh:mm:ss");
        }
    }
}
