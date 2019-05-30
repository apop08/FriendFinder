var friends = require('../data/friends.js');
module.exports = function(app) {
    // API GET Requests
    app.get('/api/friends', function(req,res){
        res.json(friends);
    });

    // API POST Requests
    app.post("/api/friends", function(req, res) {
        let scores = [];
        for (let i in req.body.scores){
            scores.push(parseInt(req.body.scores[i]));
        }

        let newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: scores
        };

        let scoreDiff = [];
        for (let i in friends){
            let sumOfDiffs = 0;
            for (let j in newFriend.scores){
                sumOfDiffs += Math.abs(newFriend.scores[j] - friends[i].scores[j])
            }
            scoreDiff.push(sumOfDiffs);
        }

        let bestMatch = 0;
        for (let i in scoreDiff){
            if(scoreDiff[i] <= scoreDiff[bestMatch]){
                bestMatch = i;
            }
        }

        res.json(friends[bestMatch]);

        friends.push(newFriend);
      });
};