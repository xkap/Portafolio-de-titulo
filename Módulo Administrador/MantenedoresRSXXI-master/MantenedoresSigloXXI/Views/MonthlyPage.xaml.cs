using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using MantenedoresSigloXXI.ViewModels;
namespace MantenedoresSigloXXI.Views
{
    /// <summary>
    /// Interaction logic for MontlyView.xaml
    /// </summary>
    public partial class MonthlyPage : Page
    {
        public MonthlyPage(MonthlyViewModel viewModel)
        {
            DataContext = viewModel;
            InitializeComponent();

        }

        private void ComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            Console.Out.Write("ASasDOPASDOPASDOPJAPSJODOPAJSD");
        }
    }
}
