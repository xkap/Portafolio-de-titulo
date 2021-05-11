using MantenedoresSigloXXI.ViewModels;
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
using System.Text.RegularExpressions;

namespace MantenedoresSigloXXI.Views
{
    /// <summary>
    /// Interaction logic for ProductUpdatePage.xaml
    /// </summary>
    public partial class ProductUpdatePage : Page
    {
        public ProductUpdatePage(ProductUpdateViewModel viewModel)
        {
            DataContext = viewModel;
            InitializeComponent();

        }



        private void btnEditProduct_Click(object sender, RoutedEventArgs e)
        {

        }

        private void btnDelete_Click(object sender, RoutedEventArgs e)
        {

        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (tbQty.Text == "")
            {
                tbQty.Text = 0.ToString();
                tbQty.CaretIndex = 1;
            }
                

        }

        private void NumberValidationTextBox(object sender, TextCompositionEventArgs e)
        {
            Regex regex = new Regex("[^0-9]+");
            e.Handled = regex.IsMatch(e.Text);
        }

    }
}
