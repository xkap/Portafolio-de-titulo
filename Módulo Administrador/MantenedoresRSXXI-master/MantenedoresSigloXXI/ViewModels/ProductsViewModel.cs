using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using MantenedoresSigloXXI.Contracts.Services;
using MantenedoresSigloXXI.Contracts.ViewModels;
using MantenedoresSigloXXI.Controllers;
using MantenedoresSigloXXI.Core.Contracts.Services;
using MantenedoresSigloXXI.Core.Models;
using MantenedoresSigloXXI.Helpers;
using MantenedoresSigloXXI.Models;

namespace MantenedoresSigloXXI.ViewModels
{
    public class ProductsViewModel : BaseViewModel
    {

        private Product _selected;
        public List<Product> Products;

        private ICommand _productUpdateCommand;
        private ICommand _newProductCommand;
        private void OnProductUpdateInvoked()
        {
            if (_selected != null)
            {
                NavigateTo(typeof(ProductUpdateViewModel), _selected);
            }
            else
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxChooseOneProduct, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
            }
        }

        private void OnNewProductInvoked()
        {
            
                NavigateTo(typeof(NewProductViewModel));
            
        }
        public ICommand ProductUpdateCommand => _productUpdateCommand ?? (_productUpdateCommand = new RelayCommand(OnProductUpdateInvoked));
        public ICommand NewProductCommand => _newProductCommand ?? (_newProductCommand = new RelayCommand(OnNewProductInvoked));

        public Product Selected
        {
            get { return _selected; }
            set { Set(ref _selected, value); }
        }

        private ObservableCollection<Product> listOfProducts;

        public ProductsViewModel(INavigationService navigationService)
        {

            _navigationService = navigationService;
            Initialize();
        }

        public ObservableCollection<Product> ListOfProducts
        {
            get { return listOfProducts; }
            set
            {
                if (listOfProducts != value)
                {
                    listOfProducts = value;
                    OnPropertyChanged("ListOfProducts");
                }
            }
        }


        private void Initialize()
        {
            Products = new List<Product>();
            ListOfProducts = new ObservableCollection<Product>();
            //UpdateProductList();

            //Products = ProductController.DeserializeProducts();
        }

        public void UpdateProductList()
        {
            if (Products.Count > 0)
                Products.Clear();
            if (ListOfProducts.Count > 0)
                ListOfProducts.Clear();
            ProductController.GetProductsJSON();

            Products = ProductController.GetProductsList();
            if (Products == null)
                return;
                ListOfProducts = new ObservableCollection<Product>(Products);
            //Products = ProductController.DeserializeProducts();
        }

        public void FilterById(string filterBy)
        {
            ListOfProducts.Clear();

            foreach (Product p in Products)
            {
                if ( (p.Id.ToString() == filterBy) || filterBy.Length == 0)
                {
                    ListOfProducts.Add(p);
                }
            }

        }

        public void FilterByName(string filterBy)
        {
            ListOfProducts.Clear();

            foreach (Product p in Products)
            {
                if ( p.Name.ToLower().StartsWith(filterBy.ToLower()) || p.Name.ToLower().Contains(filterBy.ToLower()))
                {
                    ListOfProducts.Add(p);
                }
            }

        }

        public override void OnNavigatedTo(object parameter)
        {
            UpdateProductList();
        }

        public override void OnNavigatedFrom()
        {

        }
    }
}
