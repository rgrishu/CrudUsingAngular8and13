import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Data } from '@angular/router';
import { StudentReq,CommonResponse,StateCity} from '../Model/student-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class StudentServiceService {
  private ApiUrlBase = 'http://localhost:10050/api/AngularApi/';
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
  AddStudent(data :StudentReq):Observable<CommonResponse>{
    data.stateid=Number(data.stateid);
    data.cityid=Number(data.cityid);
    return this.http.post<CommonResponse>(this.ApiUrlBase+'AddStudent',data,httpOptions).pipe(
      catchError(this.handleError<CommonResponse>('AddStudent')) 
    )
  }
  AddState(data :StateCity):Observable<CommonResponse>{
    return this.http.post<CommonResponse>(this.ApiUrlBase+'AddState',data,httpOptions).pipe(
      catchError(this.handleError<CommonResponse>('AddState')) 
    )
  }

  GetState():Observable<Data>{
    return this.http.get<Data>(this.ApiUrlBase+'GetState',httpOptions).pipe(
      catchError(this.handleError<Data>('GetState'))
    );
  }
  
  GetStudent(ID:string):Observable<Data>{
    return this.http.get<Data>(this.ApiUrlBase+'GetStudent?ID='+Number(ID),httpOptions).pipe(
      catchError(this.handleError<Data>('GetStudent'))
    );
  }

    DeleteStudent(ID :string):Observable<CommonResponse>{
    return this.http.post<CommonResponse>(this.ApiUrlBase+'DeleteStudent?ID='+Number(ID),httpOptions).pipe(
      catchError(this.handleError<CommonResponse>('DeleteStudent')) 
    )
  }




  GetCity(StateID:string):Observable<Data>{
    return this.http.get<Data>(this.ApiUrlBase+'GetCity?StateID='+Number(StateID),httpOptions).pipe(
      catchError(this.handleError<Data>('GetCity'))
    );
  }

  AddCity(data :StateCity):Observable<CommonResponse>{
    data.StateID=Number(data.StateID);
    return this.http.post<CommonResponse>(this.ApiUrlBase+'AddCity',data,httpOptions).pipe(
      catchError(this.handleError<CommonResponse>('AddCity')) 
    )
  }
}
