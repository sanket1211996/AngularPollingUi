import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

const baseUrl = 'http://testspringboot-env.eba-2yjx3g5r.us-east-2.elasticbeanstalk.com/candidates';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl,data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByName(name) {
    return this.http.get(`${baseUrl}?title=${name}`);
  }
  
  authAdmin(authKey) {
    console.log("AUTHKEY: " + authKey);
    return this.http.post(`http://testspringboot-env.eba-2yjx3g5r.us-east-2.elasticbeanstalk.com/api/adminAuth`,authKey)
  }

}
