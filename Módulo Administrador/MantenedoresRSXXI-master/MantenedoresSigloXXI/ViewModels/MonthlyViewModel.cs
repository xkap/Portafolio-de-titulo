using MantenedoresSigloXXI.Contracts.Services;
using MantenedoresSigloXXI.Contracts.ViewModels;
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
using MantenedoresSigloXXI.Controllers;

namespace MantenedoresSigloXXI.ViewModels
{
    public class MonthlyViewModel : Observable, INavigationAware
    {
        private readonly INavigationService _navigationService;

        private ObservableCollection<string> listOfDates;
        public ObservableCollection<string> ListOfDates
        {
            get { return listOfDates; }
            set
            {
                if (listOfDates != value)
                {
                    listOfDates = value;
                    OnPropertyChanged("ListOfDates");
                }
            }
        }

        private void Initialize()
        {
            Console.Out.Write("Initializing");
            ListOfDates = new ObservableCollection<string>();
            foreach (MyDate date in MonthlyController.getDates())
            {
                ListOfDates.Add(date.Date);
            }
        }
        //private ICommand _addCTable;

        //public ICommand AddCTable => _addCTable ?? (_addCTable = new RelayCommand(newTable));

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

        public MonthlyViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
            Initialize();
            
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
