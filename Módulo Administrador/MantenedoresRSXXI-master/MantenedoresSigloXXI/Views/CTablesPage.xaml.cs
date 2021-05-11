using System.Collections.ObjectModel;
using System.Windows.Controls;
using MantenedoresSigloXXI.Controllers;
using MantenedoresSigloXXI.Models;
using MantenedoresSigloXXI.ViewModels;

namespace MantenedoresSigloXXI.Views
{
    public partial class CTablesPage : Page
    {
        public CTablesPage(CTablesViewModel viewModel)
        {
            DataContext = viewModel;
            InitializeComponent();

            // CustomersDG.ItemsSource = viewModel.Customers;


        }

        

        private void DataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            var v = (CTablesViewModel)DataContext;
            if (rbFilterById != null )
            {
                if (rbFilterById.IsChecked.Value)
                {

                    v.FilterById(tbFilter.Text);
                }
            }  
            
        }

        private void RadioButton_Checked(object sender, System.Windows.RoutedEventArgs e)
        {
            var v = (CTablesViewModel)DataContext;
            v.FilterById(tbFilter.Text);
        }

        private void rbFilterByName_Checked(object sender, System.Windows.RoutedEventArgs e)
        {
            var v = (CTablesViewModel)DataContext;
            v.FilterById(tbFilter.Text);
        }

        private void Button_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            tbFilter.Text = "";
        }

        private void btnEditCTable_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            
        }

        private void TablesDG_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }

        private void btnEditProduct_Click(object sender, System.Windows.RoutedEventArgs e)
        {

        }

        private void btnNewCTable_Click(object sender, System.Windows.RoutedEventArgs e)
        {

        }
    }
}
