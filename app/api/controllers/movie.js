const movieModel =  require('../models/movie');
module.exports = {

    getById: function (req, res, next) {
        console.log(req.body);
        movieModel.findById(req.params.movieId, function (err, movieInfo) {
            if(err)
                next(err);
            else{
                res.json({status:"success",message:"Movie found",data:{movies:movieInfo}});
            }
        });

    },

    getAll: function(req, res, next){
        let movieList = [];
        movieModel.find({},function(err,movies){
            if(err)
                next(err);
            else{
                for(let movie of movies){
                    movieList.push({id:movie._id,name:movie.name,released_on:movie.released_on});
                }
                res.json({status:"success",message:"Movies list found!!!",data:{movies:movieList}});
            }
        });
    },

    updateById: function(req, res, next){
        movieModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name},function(err,movieInfo){
            if(err)
                next(err);
            else{
                    res.json({status:"success",message:"movie updated successfully",data:null});
            }
        });
    },

    deleteById: function(req, res, next){
        movieModel.findByIdAndRemove(req.params.movieId, function(err, movieInfo){
            if(err)
                next(err);
            else{
                res.json({status:"success",message:"movie deleted successfully!!!",data:null});
            }

        });

    },

    create: function(res, req, next){
        movie.create({name:req.body.name,released_on:req.body.released_on},function(err,result){
            if(err)
                next(err);
            else{
                res.json({status:"success",message:"Movie added successfully!!", data:null});
            }
        });
    },



}
