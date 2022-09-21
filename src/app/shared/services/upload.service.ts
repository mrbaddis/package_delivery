import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { FileInput } from 'ngx-material-file-input';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface LoopbackFileResult {
  container: string;
  field: string;
  name: string;
  originalFilename: string;
  size: number;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  constructor(
    private http: HttpClient,
  ) { }

  uploadFile(file: FileInput, folder: string, container: string): Observable<LoopbackFileResult> {
    const endpoint =  `${environment.apiUrl}/${environment.apiVersion}/${folder}/${container}/upload`;
    const formData: FormData = new FormData();
    console.log(file);
    formData.append('file', file.files[0], file.files[0].name);
    return this.http
      .post(endpoint, formData)
      .pipe(
        map((uploadResult: any) => {
          return uploadResult.result.files.file[0];
        }),
      );
  }

}
