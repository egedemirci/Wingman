import db from "../db.js"

export default class matchController{
    static async getMatchDataById(req, res, next){
        try {
          const result = await db.query('SELECT m.*, r.name, r.surname, r.age, r.currentseasonmatches,r.avatarurl, t.teamname as home_teamname, t.teamlogo as home_logo, t1.teamname as away_teamname, t1.teamlogo as away_logo FROM wingman.matches m, wingman.referees r, wingman.teams t, wingman.teams t1 WHERE m.match_id = $1 AND  t.teamid = m.home_id AND t1.teamid = m.away_id AND m.referee_id = r.id', [req.params.id])
          if(result.rows.length == 0)
          {
            throw {
              detail: "Match not found.",
              code: 1,
              error: new Error()
            };
          }
          const timeline = await db.query('SELECT * FROM wingman.matchtimelines WHERE match_id = $1 ORDER BY event_time::int ASC', [req.params.id])
          res.status(200).json({
          data: result.rows[0],
          timeline: timeline.rows
          })
        } catch (err) {
          console.log(`Error when getting one match ${err}`)
          if(err.code == 1)
          {
            res.status(404).json({detail:err.detail, data:[]})
            return
          }
          res.status(400).json({detail:err, data:[]})
        }   
      }

      static async rateMatch(req, res, next){
        try {
          const userRole = await db.query('SELECT role FROM wingman.users WHERE user_id = $1', [req.body.user_id])
          if(userRole.rows.length == 0)
          {
            throw {
              detail: "Rater not found.",
              code: 1,
            };
          }
          if(userRole.rows[0].role == "TFF Admin" || userRole.rows[0].role == "Super Admin")
          {
            throw {
              detail: "User can't rate.",
              code: 1,
            };
          }
          const match = await db.query('SELECT * FROM wingman.matches WHERE match_id = $1', [req.body.match_id])
          if(match.rows.length == 0)
          {
            throw {
              detail: "Match not found.",
              code: 1,
            };
          }
          let r_id = match.rows[0].referee_id;
        
          if(req.body.rate <= 0 || req.body.rate >= 11)
          {
            throw {
              detail: "Rate range wrong.",
              code: 1,
            };
          }
          const result = await db.query('SELECT * FROM wingman.ratings WHERE user_id = $1 AND match_id = $2', [req.body.user_id, req.body.match_id])
          if(result.rows.length != 0)
          {
            throw {
              detail: "You already rated this match.",
              code: 1
            };
          }

          const newInsert = await db.query('INSERT INTO wingman.ratings (referee_id, user_id, match_id, rate) VALUES ($1, $2, $3, $4) returning *', [r_id, req.body.user_id, req.body.match_id, req.body.rate])
          if(newInsert.rows.length == 0)
          {
            throw {
              detail: "Error on insert.",
              code: 1
            };
          }

          res.status(200).json({
          data: newInsert.rows[0],
          })
        } catch (err) {
          console.log(`Error when rating ${err}`)
          if(err.code == 1)
          {
            res.status(401).json({detail:err.detail, data:[]})
            return
          }
          res.status(400).json({detail:err, data:[]})
        }   
      }

      static async getRate(req, res, next){
        try {
          const uid = req.query.uid;
          const rid = req.query.rid;
          const mid = req.query.mid;
          let result = [];
          let avg = -1;
          if(uid && rid && mid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE user_id = $1 AND referee_id = $2 AND match_id = $3', [uid,rid,mid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE user_id = $1 AND referee_id = $2 AND match_id = $3', [uid,rid,mid])
          }
          else if(uid && rid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE user_id = $1 AND referee_id = $2', [uid,rid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE user_id = $1 AND referee_id = $2', [uid,rid])
          }
          else if(uid && mid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE user_id = $1 AND match_id = $2', [uid,mid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE user_id = $1 AND match_id = $2', [uid,mid])
          }
          else if(rid && mid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE referee_id = $1 AND match_id = $2', [rid,mid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE referee_id = $1 AND match_id = $2', [rid,mid])
          }
          else if(uid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE user_id = $1', [uid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE user_id = $1', [uid])
          }
          else if(rid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE referee_id = $1', [rid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE referee_id = $1', [rid])
          } 
          else if(mid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE match_id = $1', [mid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE match_id = $1', [mid])
          }  
          else
          {
            result = await db.query('SELECT * FROM wingman.ratings')
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings')
          }

          if(result.rows.length == 0)
          {
            throw {
              detail: "Rate not found.",
              code: 1,
            };
          }
          res.status(200).json({
          data: result.rows,
          avg: avg.rows[0],
          })
        } catch (err) {
          console.log(`Error when getting one rate ${err}`)
          if(err.code == 1)
          {
            res.status(404).json({detail:err.detail, data:[]})
            return
          }
          res.status(400).json({detail:err, data:[]})
        }   
      }
}