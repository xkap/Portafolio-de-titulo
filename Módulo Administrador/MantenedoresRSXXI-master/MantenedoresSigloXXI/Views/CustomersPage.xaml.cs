using System.Collections.ObjectModel;
using System.Windows.Controls;
using MantenedoresSigloXXI.Controllers;
using MantenedoresSigloXXI.Models;
using MantenedoresSigloXXI.ViewModels;

namespace MantenedoresSigloXXI.Views
{
    public partial class CustomersPage : Page
    {
        public CustomersPage(CustomersViewModel viewModel)
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
            var v = (CustomersViewModel)DataContext;
            if (rbFilterByName != null && rbFilterByUsername != null)
            {
                if (rbFilterByName.IsChecked.Value)
                {

                    v.FilterByName(tbFilter.Text);
                }
                else
                {
                    v.FilterByUsername(tbFilter.Text);
                }
            }  
            
        }

        private void RadioButton_Checked(object sender, System.Windows.RoutedEventArgs e)
        {
            var v = (CustomersViewModel)DataContext;
            v.FilterByUsername(tbFilter.Text);
        }

        private void rbFilterByName_Checked(object sender, System.Windows.RoutedEventArgs e)
        {
            var v = (CustomersViewModel)DataContext;
            v.FilterByName(tbFilter.Text);
        }

        private void Button_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            tbFilter.Text = "";
        }

        private void btnEditCustomer_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            
        }

        private void CustomersDG_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }


    }
}
