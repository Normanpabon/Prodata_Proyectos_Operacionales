package com.prodata.ProdataAPI.services;

import com.prodata.ProdataAPI.dto.msUsuarios.Preferencia;
import com.prodata.ProdataAPI.dto.msUsuarios.Rol;
import com.prodata.ProdataAPI.dto.msUsuarios.Usuario;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UsuariosServiceClient {

    private WebClient webClient;

    public UsuariosServiceClient(WebClient.Builder builder){
        this.webClient = builder.baseUrl("http://localhost:8088/MSUsers/V1").build();
    }

    // Implementar llamados
    // Usuarios


    public Mono<Long> tryLogin(String pass, String username){
        return this.webClient.post().uri("/usuario/login/{pass}/{username}", pass, username)
                .retrieve().bodyToMono(Long.class);
    }

    public Mono<Rol> getRolByUid(int uid){
        return this.webClient.post().uri("/usuario/getRol/{uid}", uid).retrieve()
                .bodyToMono(Rol.class);

    }

    // GETS

    public Flux<Usuario> getAllUsers(){
        return this.webClient.get().uri("/usuario/all").retrieve().bodyToFlux(Usuario.class);
    }

    public Mono<Usuario> getUserById(int id){
        return this.webClient.get().uri("/usuario/{id}", id).retrieve().bodyToMono(Usuario.class);
    }

    // POSTs

    public Mono<Usuario> postUsuario(int cod_ins, String nombre, String apellido, String username,
                                     String correo, int rol, String pass){
        return this.webClient.post().uri("/usuario/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}",
                cod_ins, nombre, apellido, username, correo, rol, pass).retrieve().bodyToMono(Usuario.class);

    }

    // Updates

    public Mono<Usuario> updateUsuario(int id,int cod_ins, String nombre, String apellido, String username,
                                       String correo, int rol, String pass){
        return this.webClient.post().uri("/usuario/{id}/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}", id,
                cod_ins, nombre, apellido, username, correo, rol, pass).retrieve().bodyToMono(Usuario.class);

    }

    // Roles

    // Gets

    public Flux<Rol> getAllRoles(){
        return this.webClient.get().uri("/rol/roles").retrieve().bodyToFlux(Rol.class);
    }

    public Mono<Rol> getRolById(int id){
        return this.webClient.get().uri("/rol/{id}", id).retrieve().bodyToMono(Rol.class);
    }

    // Posts

    public Mono<Rol> postRol(String rol){
        return this.webClient.post().uri("/rol/{rol}", rol).retrieve().bodyToMono(Rol.class);
    }

    // Updates

    public Mono<Rol> updateRol(int id, String rol){
        return this.webClient.put().uri("/rol/{id}/{rol}", id, rol).retrieve().bodyToMono(Rol.class);
    }

    // Preferencias


    // Gets

    public Mono<Preferencia> getPreferenciaDefault(){
        return this.webClient.get().uri("/pref/default").retrieve().bodyToMono(Preferencia.class);
    }

    public Mono<Preferencia> getPreferenciaByUid(int uid){
        return this.webClient.get().uri("/pref/usr/{uid}", uid).retrieve().bodyToMono(Preferencia.class);
    }

    // Posts

    public Mono<Preferencia> postPreferencia(int uid, int orden_pro, int tema, int fuente){
        return this.webClient.post().uri("/pref/{uid}/{orden_pro}/{tema}/{fuente}",
                uid, orden_pro, tema, fuente).retrieve()
                .bodyToMono(Preferencia.class);
    }

    // Updates

    public Mono<Preferencia> updatePreferencia(int id, int uid, int orden_pro, int tema, int fuente){
        return this.webClient.put().uri("/pref/{id}/{uid}/{orden_pro}/{tema}/{fuente}",
                        id ,uid, orden_pro, tema, fuente).retrieve()
                .bodyToMono(Preferencia.class);
    }

}

