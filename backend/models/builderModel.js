import sql from 'mssql'; 
import config from '../config/dbconfig.js'; 


//Create New Builder
export const createBuilder = async (builderData) => {
  const {
    city,
    builderCompleteName,
    builderShortName,
    builderLogo,
    yearsInRealEstate,
    shortDescription,
  } = builderData;

  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('city', sql.NVarChar, city)
      .input('fullName', sql.NVarChar, builderCompleteName)
      .input('nickName', sql.NVarChar, builderShortName)
      .input('builderLogo', sql.NVarChar, builderLogo)
      .input('yearsOfExperience', sql.Int, yearsInRealEstate)
      .input('shortDescription', sql.NVarChar, shortDescription)
      .query(`
        INSERT INTO Builders (
          City,
          FullName,
          NickName,
          Builder_logo,
          Years_of_experience,
          Short_Description,
          Builder_isVerified
        ) VALUES (
          @city,
          @fullName,
          @nickName,
          @builderLogo,
          @yearsOfExperience,
          @shortDescription,
          0
        )
      `);

    return result.rowsAffected[0];
  } catch (err) {
    console.error('Error creating builder:', err.message);
    throw err;
  }
};

//Get Builder id and Names
export const getBuilders = async () => {
  try {
    const pool = await sql.connect(config); 

    const result = await pool.request().query(`
      SELECT Builder_id, FullName 
      FROM Builders;
    `);

    return result.recordset;
  } catch (err) {
    console.error('Error fetching builders:', err.message);
    throw err;
  }
};


// Verify Builder by ID
export const verifyBuilderById = async (builderId) => {
  try {
    const pool = await sql.connect(config); 

    const result = await pool.request()
      .input('builderId', sql.Int, builderId)
      .query(`
        UPDATE Builders
        SET Builder_isVerified = 1
        WHERE Builder_id = @builderId;
      `);

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error('Error verifying builder by ID:', err.message);
    throw new Error('Error updating builder verification status');
  }
};


// Get All Builders Information
export const getAllBuildersInfo = async () => {
  try {
    const pool = await sql.connect(config); 

    const result = await pool.request().query(`
      SELECT Builder_id, City, FullName, NickName, Builder_logo, Years_of_experience, Short_Description, Builder_isVerified
      FROM Builders;
    `);

    return result.recordset;
  } catch (err) {
    console.error('Error fetching all builders information:', err.message);
    throw new Error('Error fetching all builders information');
  }
};



// Get Verified Builders
export const getVerifiedBuilders = async () => {
  try {
    const pool = await sql.connect(config);

    // Query to fetch only verified builders
    const result = await pool.request().query(`
      SELECT Builder_id, FullName
      FROM Builders
      WHERE Builder_isVerified = 1;
    `);

    return result.recordset;
  } catch (err) {
    console.error('Error fetching verified builders:', err.message);
    throw new Error('Error fetching verified builders');
  }
};




