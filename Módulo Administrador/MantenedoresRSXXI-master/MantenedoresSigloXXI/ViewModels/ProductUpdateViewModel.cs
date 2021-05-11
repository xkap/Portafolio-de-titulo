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
using System.Collections.ObjectModel;

namespace MantenedoresSigloXXI.ViewModels
{
    public class ProductUpdateViewModel : Observable, INavigationAware
    {
        private readonly INavigationService _navigationService;
        private ICommand _editProduct;
        private ICommand _deleteProduct;

        public ICommand EditProduct => _editProduct ?? (_editProduct = new RelayCommand(OnEditProduct));
        public ICommand DeleteProduct => _deleteProduct ?? (_deleteProduct = new RelayCommand(OnDeleteProduct));
        // Product _updatingProduct;
        //Observable name = new Observable();

        

        private Product originalProduct;
        private Product updatingProduct;
        public Product UpdatingProduct


        {
            get { return updatingProduct; }
            set
            {
                if (updatingProduct != value)
                {
                    updatingProduct = value;
                    OnPropertyChanged("UpdatingProduct");
                }
            }
        }

        public ProductUpdateViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
        }

        private void OnDeleteProduct()
        {
            if(UpdatingProduct != null)
            {
                MessageBoxResult result = MessageBox.Show(Properties.Resources.WarningMsgBoxDeleteProduct, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OKCancel);
                switch (result)
                {
                    case MessageBoxResult.OK:
                        int r = ProductController.DeleteProduct(UpdatingProduct);
                        if (r == 201)
                        {


                            MessageBox.Show(Properties.Resources.ProductDeleted, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
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
            else
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxChooseOneProduct, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
            }
            
            
            
        }

        private void OnEditProduct()
        {
            if(IsValid())
            { 
                MessageBoxResult result = MessageBox.Show(Properties.Resources.WarningMsgBoxEdit, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OKCancel);
                switch (result)
                {
                    case MessageBoxResult.OK:

                        int r =ProductController.EditProduct(UpdatingProduct);
                        if (r == 201)
                        {
                            MessageBox.Show(Properties.Resources.ProductUpdated, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
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
            if (originalProduct.Name == updatingProduct.Name &&
                originalProduct.Quantity == updatingProduct.Quantity)
            {
                Debug.WriteLine("son iguales");
                Back();
                return false;
            }       
                
            if (!Regex.IsMatch(updatingProduct.Quantity.ToString(), @"^[0-9]\d{0,5}$"))
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
            
            UpdatingProduct = (Product)sender;
            originalProduct = new Product
            {
                Name = UpdatingProduct.Name,
                Quantity = UpdatingProduct.Quantity,
            };

        }


        public void Back()
        {
            _navigationService.GoBack();
        }
    }
}
