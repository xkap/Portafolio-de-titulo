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
    public class CustomersViewModel :  BaseViewModel
    {
        
        private Customer _selected;
        public List<Customer> Customers;

        private ICommand _customerUpdateCommand;
        private void OnCustomerUpdateInvoked()
        {
            if (_selected != null)
            {
                NavigateTo(typeof(CustomerUpdateViewModel), _selected);
            }
            else
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxChooseOneCustomer, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
            }
        }
        public ICommand CustomerUpdateCommand => _customerUpdateCommand ?? (_customerUpdateCommand = new RelayCommand(OnCustomerUpdateInvoked));
        public Customer Selected
        {
            get { return _selected; }
            set { Set(ref _selected, value); }
        }

        private ObservableCollection<Customer> listOfCustomers;

        public CustomersViewModel(INavigationService navigationService)
        {
            
            _navigationService = navigationService;
            Initialize();
        }

        public ObservableCollection<Customer> ListOfCustomers
        {
            get { return listOfCustomers; }
            set
            {
                if (listOfCustomers != value)
                {
                    listOfCustomers = value;
                    OnPropertyChanged("ListOfCustomers");
                }
            }
        }


        private void Initialize()
        {
            Customers = new List<Customer>();
            ListOfCustomers = new ObservableCollection<Customer>();
            //UpdateCustomerList();

            //Customers = CustomerController.DeserializeCustomers();
        }

        public void UpdateCustomerList()
        {
            if(Customers.Count > 0)
                Customers.Clear();
            if(ListOfCustomers.Count > 0)
                ListOfCustomers.Clear();
            CustomerController.GetCustomersJSON();
            
            Customers = CustomerController.GetCustomersList();
            ListOfCustomers = new ObservableCollection<Customer>(Customers);
            //Customers = CustomerController.DeserializeCustomers();
        }

        public void FilterByUsername(string filterBy)
        {
            ListOfCustomers.Clear();

            foreach (Customer c in Customers)
            {
                if (c.Username.ToLower().StartsWith(filterBy.ToLower()))
                {
                    ListOfCustomers.Add(c);
                }
            }

        }

        public void FilterByName(string filterBy)
        {
            ListOfCustomers.Clear();

            foreach (Customer c in Customers)
            {
                if (c.Name.ToLower().StartsWith(filterBy.ToLower()) || c.LastName.ToLower().StartsWith(filterBy.ToLower()))
                {
                    ListOfCustomers.Add(c);
                }
            }

        }

        public override void OnNavigatedTo(object parameter)
        {
            UpdateCustomerList();
        }

        public override void OnNavigatedFrom()
        {
            
        }
    }
}
