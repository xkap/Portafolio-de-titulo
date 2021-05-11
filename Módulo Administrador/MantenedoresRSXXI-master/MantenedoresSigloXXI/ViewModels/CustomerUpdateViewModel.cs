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
    public class CustomerUpdateViewModel : Observable, INavigationAware
    {
        private readonly INavigationService _navigationService;
        private ICommand _editCustomer;
        private ICommand _deleteCustomer;

        public ICommand EditCustomer => _editCustomer ?? (_editCustomer = new RelayCommand(OnEditCustomer));
        public ICommand DeleteCustomer => _deleteCustomer ?? (_deleteCustomer = new RelayCommand(OnDeleteCustomer));
        // Customer _updatingCustomer;
        //Observable name = new Observable();
        private Customer originalCustomer;
        private Customer updatingCustomer;
        public Customer UpdatingCustomer
        {
            get { return updatingCustomer; }
            set
            {
                if (updatingCustomer != value)
                {
                    updatingCustomer = value;
                    OnPropertyChanged("UpdatingCustomer");
                }
            }
        }

        public CustomerUpdateViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
        }

        private void OnDeleteCustomer()
        {
            if(UpdatingCustomer != null)
            {
                MessageBoxResult result = MessageBox.Show(Properties.Resources.WarningMsgBoxDeleteCustomer, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OKCancel);
                switch (result)
                {
                    case MessageBoxResult.OK:
                        int r = CustomerController.DeleteCustomer(UpdatingCustomer);
                        if (r == 201)
                        {


                            MessageBox.Show(Properties.Resources.CustomerDeleted, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
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
                MessageBox.Show(Properties.Resources.WarningMsgBoxChooseOneCustomer, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
            }
            
            
            
        }

        private void OnEditCustomer()
        {
            if(IsValid())
            { 
                MessageBoxResult result = MessageBox.Show(Properties.Resources.WarningMsgBoxEdit, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OKCancel);
                switch (result)
                {
                    case MessageBoxResult.OK:
                        int r = CustomerController.EditCustomer(UpdatingCustomer);
                        if (r == 201)
                        {


                            MessageBox.Show(Properties.Resources.CustomerUpdated, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
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
            if (originalCustomer.Name == updatingCustomer.Name &&
                originalCustomer.Email == updatingCustomer.Email &&
                originalCustomer.LastName == updatingCustomer.LastName)
            {
                Debug.WriteLine("son iguales");
                Back();
                return false;
            }
            var email = new EmailAddressAttribute();
            if (!email.IsValid(updatingCustomer.Email))
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxInvalidEmail,Properties.Resources.WarningMsgBoxTitle , MessageBoxButton.OK);
                return false;
            }

            if (!Regex.IsMatch(updatingCustomer.Name, @"^[a-zA-Z]+$"))
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxInvalidName, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
                return false;
            }
                
            if (!Regex.IsMatch(updatingCustomer.LastName, @"^[a-zA-Z]+$"))
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxInvalidLastName, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
                return false;
            }
            return true;
        }

        public void OnNavigatedFrom()
        {
            
        }

        public void OnNavigatedTo(object sender)
        {
            UpdatingCustomer = (Customer)sender;
            originalCustomer = new Customer
            {
                Name = updatingCustomer.Name,
                LastName = updatingCustomer.LastName,
                Email = updatingCustomer.Email
            };

        }


        public void Back()
        {
            _navigationService.GoBack();
        }
    }
}
