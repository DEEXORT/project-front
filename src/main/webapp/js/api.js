function getPlayers() {
    $.ajax({
        url: "rest/players/",
        method: "get",
        dataType: 'json',
        data: {
            pageNumber: currentPage,
            pageSize: countPerPage
        },
        success: function (response) {
            // Очищаем тело таблицы
            $('#table-players tbody').empty();

            $.each(response, function (index, player) {
                let date = new Date(player.birthday),
                    year = '' + date.getFullYear(),
                    month = '' + (date.getMonth() + 1),
                    day = '' + date.getDate();
                let formatDate = [month, day, year].join('/');

                let row = $('<tr>');
                row.append($('<td>').addClass("id").text(player.id));
                row.append($('<td>').addClass("name text-field").text(player.name));
                row.append($('<td>').addClass("title text-field").text(player.title));
                row.append($('<td>').addClass("race").text(player.race));
                row.append($('<td>').addClass("profession").text(player.profession));
                row.append($('<td>').addClass("level").text(player.level));
                row.append($('<td>').addClass("formatDate").text(formatDate));
                row.append($('<td>').addClass("banned").text(player.banned));
                row.append($('<td>').append($('<button>').addClass("btn-img-edit")
                    .click(function (event) {
                        toggleBtnEdit(event.currentTarget, player);
                    })
                ));
                row.append($('<td>').append($('<button>').addClass("btn-img-delete")
                    .click(() => deletePlayer(player.id)
                    )));

                $('#table-players tbody').append(row);

            })
        }
    })
}