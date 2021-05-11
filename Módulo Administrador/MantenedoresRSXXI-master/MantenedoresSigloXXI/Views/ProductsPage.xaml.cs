using System.Collections.ObjectModel;
using System.Windows.Controls;
using MantenedoresSigloXXI.Controllers;
using MantenedoresSigloXXI.Models;
using MantenedoresSigloXXI.ViewModels;

namespace MantenedoresSigloXXI.Views
{
    public partial class ProductsPage : Page
    {
        public ProductsPage(ProductsViewModel viewModel)
        {
            DataContext = viewModel;
            InitializeComponent();


            // ProductsDG.ItemsSource = viewModel.Products;


        }

        private void DataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            var v = (ProductsViewModel)DataContext;
            if (rbFilterByName != null && rbFilterById != null)
            {
                if (rbFilterByName.IsChecked.Value)
                {

                    v.FilterByName(tbFilter.Text);
                }
                else
                {
                    v.FilterById(tbFilter.Text);
                }
            }

        }

        private void RadioButton_Checked(object sender, System.Windows.RoutedEventArgs e)
        {
            var v = (ProductsViewModel)DataContext;
            v.FilterById(tbFilter.Text);
        }

        private void rbFilterByName_Checked(object sender, System.Windows.RoutedEventArgs e)
        {
            var v = (ProductsViewModel)DataContext;
            v.FilterByName(tbFilter.Text);
        }

        private void Button_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            tbFilter.Text = "";
        }

        private void btnEditProduct_Click(object sender, System.Windows.RoutedEventArgs e)
        {

        }
    }
}
