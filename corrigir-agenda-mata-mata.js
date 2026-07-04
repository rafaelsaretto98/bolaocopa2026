for (const id in agendaMataMata) {

    const jogo = await carregarJogoMataMata(id);

    if (!jogo) continue;

    await atualizarJogoMataMata({

        ...jogo,

        data: agendaMataMata[id].data,
        horario: agendaMataMata[id].horario,
        cidade: agendaMataMata[id].cidade,
        estadio: agendaMataMata[id].estadio

    });

}
