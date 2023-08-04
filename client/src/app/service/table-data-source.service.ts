import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataSourceService {
  public data: any[] = []

  constructor(private http: HttpClient) { }
  getMonthList() {
    return this.http.get<any[]>('http://localhost:5100/expenses')
  }

  postTableRow(monthDateForBackend:any){
    return this.http.post('http://localhost:5100/months-data/insert-tablerow', monthDateForBackend)
  }

  getTableRows(monthYear:string, monthNumber:string, tableName:string){
    let parameters = new HttpParams();
    parameters = parameters.append('monthYear',monthYear);
    parameters = parameters.append('monthNumber',monthNumber);
    parameters = parameters.append('tableName',tableName);
    return this.http.get<any[]>("http://localhost:5100/months-table-data",{
      params: parameters
    })
  }

  sendExpenseDetails() {
    const expenseData = {
      userId: 'your-user-id',
      monthYear: '2023-05', // replace with your desired month and year
      monthNumber: 5, // replace with the corresponding month number
      tables: [
        {
          tableName: 'earnings',
          columns: [
            { date: '2023-05-01', name: 'Salary', amount: '5000' },
            { date: '2023-05-05', name: 'Bonus', amount: '1000' }
          ],
          rows: [
            { date: '2023-05-01', name: 'Expense 1', amount: '200' },
            { date: '2023-05-10', name: 'Expense 2', amount: '300' }
          ]
        },
        // Add more tables if needed
      ]
    };

    this.http.post('/expenses', expenseData)
      .subscribe(
        (response) => {
          console.log('Expense details sent successfully:', response);
        },
        (error) => {
          console.error('Error sending expense details:', error);
        }
      );
  }

}
