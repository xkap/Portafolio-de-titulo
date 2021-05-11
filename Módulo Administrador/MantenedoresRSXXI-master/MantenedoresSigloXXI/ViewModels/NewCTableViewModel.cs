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
    public class NewCTableViewModel : Observable, INavigationAware
    {
        private readonly INavigationService _navigationService;
        private ICommand _addCTable;

        public ICommand AddCTable => _addCTable ?? (_addCTable = new RelayCommand(newTable));
      
        // Product _updatingProduct;
        //Observable name = new Observable();
        private CTable newCTable;
        public CTable NewCTable
        {
            get { return newCTable; }
            set
            {
                if (newCTable != value)
                {
                    newCTable = value;
                    OnPropertyChanged("NewCTable");
                }
            }
        }

        public NewCTableViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
        }

      

        private void newTable()
        {
            
            if(IsValid())
            { 
                MessageBoxResult result = MessageBox.Show(Properties.Resources.WarningMsgBoxEdit, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OKCancel);
                switch (result)
                {
                    case MessageBoxResult.OK:
                        int r = CTableController.addTable(NewCTable);
                        if(r == 201)
                        {

                        
                            MessageBox.Show(Properties.Resources.CTableCreated, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
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
                /*
            if (!Regex.IsMatch(newCTable.Quantity.ToString(), @"^[0-9]\d{0,5}$"))
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxInvalidQuantity, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
                return false;
            }*/
            return true;
        }

        public void OnNavigatedFrom()
        {
            
        }

        public void OnNavigatedTo(object sender)
        {
            NewCTable = new CTable();


        }


        public void Back()
        {
            _navigationService.GoBack();
        }
    }
}
