function getStudent(params) {
    var { gtUsername } = params;
    //We can use knex to remove the need to do string interpolation to perform our DB transactions.
    var query = `SELECT * FROM Students WHERE gtUsername = ${gtUsername}`;
}
