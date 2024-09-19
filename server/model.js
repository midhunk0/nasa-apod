const { Pool }=require("pg");
const dotenv=require("dotenv").config();

const pool=new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port ? parseInt(process.env.port) : undefined
});

pool.query(
    `create table if not exists users(
        username varchar(50) not null unique primary key,
        email varchar(50) not null,
        password varchar(255) not null
    )`,
    (err)=>{
        if(err){
            console.log("Error creating users table", err);
            process.exit(1);
        }
        else{
            console.log("Users table is ready");
            pool.query(
                `create table if not exists fav(
                    username varchar(50) references users(username) on delete cascade,
                    title varchar(200) not null,
                    date date not null,
                    primary key (username, date)
                )`,
                (err)=>{
                    if(err){
                        console.log("Error creating favourite table", err);
                        process.exit(1);
                    }
                    else{
                        console.log("Favourites table is ready");
                    }
                }
            );
        }
    }
);


module.exports=pool;