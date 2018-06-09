var Book=require('../models/book'),
    User=require('../models/user');

//middleware functions
var middlewareObj={};

// middlewareObj.checkBookOwnership=function(req,res,next){
//     if(req.isAuthenticated())
//     {
//         Book.findById(req.params.id,function(err,foundBook){
//             if(err){
//                 console.log(err);
//                 req.flash("error","Book not found");
            
//             }
//         else{
//                 if (!foundBook) {
//                     req.flash("error", "Item not found.");
//                     return res.redirect("back");
//                 }
//                if(foundBook.author.id.equals(req.user._id)){
//                     next();
            
//                 }
//                 else{
//                     req.flash("error", "Permission Denied for the Requested Operation");
//                 res.redirect('back');
//                 }
        
//         }
     
//     });
    
// }
// else{
//     req.flash("error","Please Log in to Continue");
//     res.redirect('back');
// }
    
// }

// middlewareObj.checkCatalogueOwnership=function(req,res,next){
//     if(req.isAuthenticated())
//     {
//         Catalogue.findById(req.params.Catalogue_id,function(err,foundCatalogue){
//             if(err){
//                 console.log(err);
//             }
//         else{
//                if (!foundCatalogue) {
//                     req.flash("error", "Item not found.");
//                     return res.redirect("back");
//                 }
//                if(foundCatalogue.author.id.equals(req.user._id)){
//             next();
            
//                 }
//                 else{
//             res.redirect('back');
//                 }
        
//         }
     
//     });
    
// }
// else{
//     req.flash("error","Please Log in to Continue");
//     res.redirect('back');
// }
// }

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error","Please Log in to Continue");
        res.redirect('/login');
    }
}

module.exports=middlewareObj;