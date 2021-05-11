using MantenedoresSigloXXI.Contracts.Services;
using MantenedoresSigloXXI.Contracts.ViewModels;
using MantenedoresSigloXXI.Controllers;
using MantenedoresSigloXXI.Helpers;
using MantenedoresSigloXXI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Navigation;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace MantenedoresSigloXXI.ViewModels
{
    public class NewProductViewModel : Observable, INavigationAware
    {
        private readonly INavigationService _navigationService;
        private ICommand _addProduct;

        public ICommand AddProduct => _addProduct ?? (_addProduct = new RelayCommand(OnAddProduct));
      
        // Product _updatingProduct;
        //Observable name = new Observable();
        private Product newProduct;
        public Product NewProduct
        {
            get { return newProduct; }
            set
            {
                if (newProduct != value)
                {
                    newProduct = value;
                    OnPropertyChanged("NewProduct");
                }
            }
        }

        public NewProductViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
        }

      

        private void OnAddProduct()
        {
            
            if(IsValid())
            { 
                MessageBoxResult result = MessageBox.Show(Properties.Resources.WarningMsgBoxEdit, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OKCancel);
                switch (result)
                {
                    case MessageBoxResult.OK:
                        int r = ProductController.AddProduct(NewProduct);
                        if(r == 201)
                        {

                        
                            MessageBox.Show(Properties.Resources.ProductCreated, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
                        }
                        else
                        {
                            MessageBox.Show(Properties.Resources.ErrorMsg, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);


                        }
                        Back();
                        break;
                    case MessageBoxResult.Cancel:
                        break;

                }
            }
   
        }

        public bool IsValid()
        {   
                
            if (!Regex.IsMatch(newProduct.Quantity.ToString(), @"^[0-9]\d{0,5}$"))
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxInvalidQuantity, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
                return false;
            }
            return true;
        }

        public void OnNavigatedFrom()
        {
            
        }

        public void OnNavigatedTo(object sender)
        {
            NewProduct = new Product();


        }


        public void Back()
        {
            _navigationService.GoBack();
        }
    }
}
