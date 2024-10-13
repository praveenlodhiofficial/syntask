Prisma Installation (auth.js)

    1. npm install @prisma/client @auth/prisma-adapter
    2. npm install prisma --save-dev

    3. Environment Variable to setup database - 

Prisma Schema Setup (auth.js)

    1. npx prisma init (reamove database url in .env & use step 4 to setup databse & direct url)
    2. Select the folder where you want to create the schema file
    3. make a <api/db.ts> so that we can avoid creating multiple instances or new connections of Prisma Client everytime our code reloads
    4. Guide for setup prisma with Supabase - https://supabase.com/docs/guides/database/prisma
            + DATABASE_URL=""
            + DIRECT_URL=""
            <!-- get these from supabase/project/settings/configuration/Database || Transaction=DATABASE_URL || Direct=DIRECT_URL -->
            
    5. Run to push schema to supabase --- npx prisma db push 

<!--     
Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm 
 -->


Supabase Setup (auth.js)

    1. create new project in supabase
    2. Add project name & password
    3. Select region - Mumbai, India
    4. What connection you want to use? - Only Connection String (for Data Api we are using Prisma)
    5. Run to push schema to supabase --- npx prisma db push 








Nylas Setup (Node.js)

    1. Install the Nylas Node.js SDK - npm install nylas   
    2. Generate API Key & Uri in Nylas Dashboard and add it in .env file
    3. Bring these key in 'app/lib/nylas.ts'
