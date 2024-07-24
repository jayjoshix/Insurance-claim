// import { error } from '@sveltejs/kit';
import { createPool, sql } from '@vercel/postgres'
import { POSTGRES_URL } from '$env/static/private'

export async function load() {
  const db = createPool({ connectionString: POSTGRES_URL })

  try {
    const { rows: policy } = await db.query('SELECT * FROM policy')
    return {
      policy: policy,
    }
  } catch (error) {
      console.log(
        'Table does not exist, creating and seeding it with dummy data now...'
      )
      // Table is not created yet
      await seed()
      const { rows: policy } = await db.query('SELECT * FROM policy')
      return {
        policy: policy
      }
    } 
}

async function seed() {
  const db = createPool({ connectionString: POSTGRES_URL })
  const client = await db.connect();
  const createTable = await client.sql`CREATE TABLE IF NOT EXISTS policy  (
      policy_id INT PRIMARY KEY,
      provider VARCHAR(255) ,
      coverage INT ,
 "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `

  console.log(`Created "policy" table`)

  const policy = await Promise.all([
    client.sql`
          INSERT INTO policy (policy_id, provider,coverage)
          VALUES (101, 'bhatia', 250000)
          ON CONFLICT (policy_id) DO NOTHING;
      `,
    
          
      
    client.sql`
          INSERT INTO policy (policy_id, provider,coverage)
          VALUES (44, 'fraud', 250000)
          ON CONFLICT (policy_id) DO NOTHING;
      `,
    client.sql`
          INSERT INTO policy (policy_id, provider,coverage)
          VALUES (32, 'jay', 250000)
          ON CONFLICT (policy_id) DO NOTHING;
      `,
  ])
  console.log(`Seeded ${policy.length} users`)

  return {
    createTable,
    policy,
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
	
  // update: async ({ request }) => {
  //   const data = await request.formData();
  //   const db = createPool({ connectionString: POSTGRES_URL })
  //   const client = await db.connect();

  //   const id = data.get('id');
  //   const email = data.get('email');
  //   const name = data.get('name');
  //   const coverage =data.get('coverage')

  //   if (name == '') {
  //     const updateUser = await client.sql`
  //     UPDATE names
  //     SET email = ${email} Where id= ${id};`
  //   } else if (email == '') {
  //     const updateUser = await client.sql`
  //     UPDATE names
  //     SET name = ${name} Where id= ${id};`
  //   } else if (coverage == '') {
  //     const updateUser = await client.sql`
  //     UPDATE names
  //     SET name = ${name} Where id= ${id};` }
  //   else {
  //     const updateUser = await client.sql`
  //     UPDATE names
  //     SET name = ${name} , email=${email} Where id= ${id};`
  //   }

  //   return { success: true };
  // },

  // delete: async ({ request }) => {
  //   const data = await request.formData();
  //   const db = createPool({ connectionString: POSTGRES_URL })
  //   const client = await db.connect();

  //   const id = data.get('id');

  //   const deleteUser = await client.sql`
  //   DELETE FROM names
  //   WHERE id = ${id};`
	
	// 	return { success: true };
	// },

	create: async ({request}) => {
		const data = await request.formData();
    const db = createPool({ connectionString: POSTGRES_URL })
    const client = await db.connect();

    const policy_id = data.get('policy_id');
		const provider = data.get('provider');
    const coverage =data.get('coverage');

    const createpolicy = await client.sql`
      INSERT INTO policy (policy_id, provider, coverage)
      VALUES (${policy_id}, ${provider}, ${coverage})
      ON CONFLICT (policy_id) DO NOTHING;
    `
    return { success: true };
	}
};



