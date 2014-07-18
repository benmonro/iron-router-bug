People = new Meteor.Collection("people", {
    schema:{
        name:{
            type: String,
            label: "Name",
            unique: true,
            autoform: {
                value:"Fred"
            }
        }
      }
    });

if (Meteor.isClient) {
  Router.map(function() {
    this.route('home', {path:'/'});
    this.route('person', {path:'/person/:id'});
//add or remove a comment to force meteor to see  the change
  });

  Template.home.people = function() {
    return People.find({}).fetch();
  };
  PersonController = RouteController.extend({
    data:function(){ 

        return People.findOne(this.params.id);
    },
    onData:function() {
      var thePerson = Router.current().data();
      if(thePerson.name == "Fred") {
        console.log("it's fred");
      } else {
        console.log("it's not fred");
      }
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
