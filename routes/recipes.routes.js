const Recipe = require("../models/Recipe.model");
//const Author = require("../models/Author.model");
const { db } = require("../models/Recipe.model");
//const recipes = require("./routes/recipes.routes");
const router = require("express").Router();
const saySomething = (req, res, next) => {
    console.log("something");
    next();
}

const checkIfUserLoggedIn = (req, res, next) => {
    if(req.session.currentUser){
        // user is logged in :)

next();
    } else {
// user not logged in...
res.send("it's not your lucky day my friend")
    }
}

// READ: create list of recipes
router.get("recipes/create", checkIfUserLoggedIn, (req, res, next) => {
    Recipe.find()
        .then((recipesArr) => {
            res.render("recipes/recipe-create", { recipes: recipesArr });
        })
        .catch(err => {
            console.log("error getting recipes from DB", err)
            next(err);
        });
});


       // READ: display list of recipes
  //     router.get("/recipes/create", checkIfUserLoggedIn, (req, res, next) => {
    //    res.render("recipes/recipes-create”);
  //  })
   // .catch(err => {
    //    console.log("error getting recipe/create view", err)
   //     next(err);
  //  });

// READ: display list of recipes
router.get("/recipes/create", (req, res, next) => {

            res.render("recipes/recipes-list", { recipes: recipesArr });
        })
   
     

 


// CREATE: render form
router.get("/create", (req, res, next) => {
  
            res.render("recipes/recipe-create")
        })
        
        



// CREATE: process form
router.post("/create", (req, res, next) => {

    const newRecipe = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        ingredients: req.body.ingredients,
    }

    Recipe.create(newRecipe)
        .then((recipeFromDB) => {
            res.redirect("/recipes");
        })
        .catch(err => {
            console.log("error creating recipe on DB", err)
            next(err);
        });

})

//Read: authors details

//db.books.find({
   //// booksArr : {
    //$elemMatch : {
    // author : 'jk rowling'
//}}
//});

// READ: display recipe details
router.get("/recipes/:recipeId", (req, res, next) => {
    const id = req.params.recipeId;

    Recipe.findById(id)
        .then((recipeDetails) => {
            res.render("recipes/recipe-details", recipeDetails);
        })
        .catch(err => {
            console.log("error getting recipe details from DB", err)
            next(err);
        });
})


// UPDATE: display form


router.get("/recipes/:recipeId/edit", (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.findById(id)
        .then((recipeDetails) => {
            res.render("recipes/recipe-edit", recipeDetails);
        })
        .catch(err => {
            console.log("error getting recipe details from DB", err)
            next(err);
        });
});

//get to display and update a specific book /*
//router.get('/authors/:authorId/edit', (req, res, next) => {
  //  const {authorId} = req.params;

  //  Author.findById(authorId)
  //  .then(authorToEdit => {
   //     res.render('authors/author-edit.hbs',  {author: authorToEdit});
//
  //  })
   // .catch(error => next(error));
//});



// UPDATE: process form
router.post("/recipes/:recipeId/edit", (req, res, next) => {

    const id = req.params.recipeId;

    const newDetails = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        ingredients: req.body.ingredients,
    };

    Recipe.findByIdAndUpdate(id, newDetails)
        .then((recipeFromDB) => {
            res.redirect(`/recipes/${recipeFromDB._id}`);
        })
        .catch(err => {
            console.log("error updating recipe in DB", err)
            next(err);
        });
});



// DELETE.
router.post("/recipes/:recipeId/delete", (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.findByIdAndRemove(id)
        .then(response => {
            res.redirect("/recipes");
        })
        .catch(err => {
            console.log("error deleting recipe from DB", err);
            next(err);
        });

});


module.exports = router;