var developmentDatabase = {
    postgres: {
    host: 'ec2-34-202-54-225.compute-1.amazonaws.com',
    port: 5432,
    database: 'd9ei9846nufsbf',
    user: 'cewyhyevmlshex',
    password: '3462916b91621e0542f13fd1d3aadc3569f000179909e37a80be95886517dfc4'
    }
    }
    
    var connectionString = "postgres://cewyhyevmlshex:3462916b91621e0542f13fd1d3aadc3569f000179909e37a80be95886517dfc4@ec2-34-202-54-225.compute-1.amazonaws.com:5432/d9ei9846nufsbf";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }