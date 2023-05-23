import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap } from 'rxjs';
import {
  CreateInscripcionData,
  Inscripcion,
  InscripcionWithAll,
} from '../models';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesServiceService {
  constructor(private httpClient: HttpClient) {}

  createInscripcion(
    data: CreateInscripcionData
  ): Observable<InscripcionWithAll> {
    return this.httpClient
      .post<Inscripcion>(`${enviroment.apiBaseUrl}/inscripciones`, data)
      .pipe(
        concatMap((createResponse) =>
          this.getInscriptionWithAllById(createResponse.id)
        )
      );
  }

  getInscriptionWithAllById(id: number): Observable<InscripcionWithAll> {
    return this.httpClient.get<InscripcionWithAll>(
      `${enviroment.apiBaseUrl}/inscripciones/${id}?_expand=alumno&_expand=curso`
    );
  }

  getAllInscripciones(): Observable<InscripcionWithAll[]> {
    return this.httpClient.get<InscripcionWithAll[]>(
      `${enviroment.apiBaseUrl}/inscriptions?_expand=curso&_expand=alumno`
    );
  }

  deleteInscripcionById(id: number): Observable<unknown> {
    return this.httpClient.delete(
      `${enviroment.apiBaseUrl}/inscriptions/${id}`
    );
  }

  editarInscripcion(
    inscripcionId: number,
    actualizacion: Partial<InscripcionWithAll>
  ): Observable<InscripcionWithAll[]> {
    return this.httpClient.put<InscripcionWithAll[]>(
      `${enviroment.apiBaseUrl}/inscriptions?_expand=curso&_expand=alumno`,
      actualizacion
    );
  }
  //   editarInscripcion(
  //     inscripcionId: number,
  //     actualizacion: Partial<Inscripcion>
  //   ): Observable<Inscripcion[]> {
  //     this.inscripciones$.pipe(take(1)).subscribe({
  //       next: (inscripciones) => {
  //         const inscripcionesActualizados = inscripciones.map((inscripcion) => {
  //           if (inscripcion.id === inscripcionId) {
  //             return {
  //               ...inscripcion,
  //               ...actualizacion,
  //             };
  //           } else {
  //             return inscripcion;
  //           }
  //         });

  //         this.inscripciones$.next(inscripcionesActualizados);
  //       },
  //       //complete: () => {},
  //       //error: () => {}
  //     });

  //     return this.inscripciones$.asObservable();
  //   }
  // }
}
