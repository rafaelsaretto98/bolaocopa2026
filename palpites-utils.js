export function jogoAberto(jogo){

    if(!jogo?.data || !jogo?.horario){
        return false;
    }

    const agora = new Date();

    const inicio = new Date(

        `${jogo.data}T${jogo.horario}:00`

    );

    return agora < inicio;

}
