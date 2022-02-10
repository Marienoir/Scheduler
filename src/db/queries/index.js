const scheduleQueries = {
    createUser: `
         INSERT INTO users (
             first_name,
             last_name,
             email,
             password,
             created_at,
             updated_at
         ) VALUES($1, $2, $3, $4, NOW(), NOW())
         RETURNING *
        `,
    createSchedule: `
         INSERT INTO schedule (
             email,
             name_of_schedule,
             time_of_schedule,
             place_of_schedule,
             purpose_of_schedule,
             created_at,
             updated_at
         ) VALUES($1, $2, $3, $4, $5, NOW(), NOW())
         RETURNING *
        `,
        getUserByEmail: `
        SELECT 
            id,
            first_name,
            last_name,
            email,
            password
        FROM users
        WHERE email=$1 
          `,
  };
  
  export default scheduleQueries;
  