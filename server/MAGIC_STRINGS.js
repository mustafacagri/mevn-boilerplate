module.exports = {
  controllers: {
    posts: {
      atLeastOneCategory: 'Posts must have at least one category!',
      created: 'Post has been created successfully!',
      deleted: 'The post has been deleted successfully!',
      updated: 'The post has been updated successfully!',
      atLeastOneImage: 'Posts must have at least one image / photo!',
      commentCreated: 'The comment has been submitted successfully!',
      commentUpdated: 'The comment has been updated successfully!'
    },
    postCategories: {
      created: 'Post category has been created successfully!',
      deleted: 'The category post has been deleted successfully!',
      updated: 'The category post has been updated successfully!'
    },
    check: {
      adminUser: 'This is an admin user!'
    },
    auth: {
      userNotFound: 'User not found',
      invalidPassword: 'Invalid Password!',
      userNotActive: 'User is not active!',
      userCreated: 'The user has been successfully created!',
      userActivated: 'The user has been successfully activated!',
      invalidAuthCode: 'Invalid Auth Code!',
      userAlreadyActivated: 'User already activated!'
    },
    users: {
      rolesCanNotBeEmpty: 'Roles can not be empty!',
      userDeleted: 'The user has been deleted successfully!',
      publicContent: 'Public Content',
      userContent: 'User Content',
      adminContent: 'Admin Content',
      moderatorContent: 'Moderator Content',
      userUpdated: 'User info has been updated successfully!',
      passwordAndRepasswordMustBeTheSame: 'Password and Repeat Password must be the same!'
    },
    tickets: {
      created: 'Ticket has been created successfully!',
      notFound: 'Ticket(s) not found!',
      invalidId: 'Invalid Id!',
      commentCreated: 'The comment has been submitted successfully!'
    },
    todos: {
      created: 'Todo has been created successfully!',
      notFound: 'Todo not found!',
      invalidId: 'Invalid Id!',
      dataMustBeProvided: 'All fields must be provided!',
      deleted: 'Todo has been deleted successfully!',
      updated: 'Todo has been updated successfully!'
    }
  },
  middlewares: {
    posts: {
      canNotFindPost: 'Can not find the post!',
      canNotFindPostCategory: 'Can not find the post category!'
    },
    user: {
      authJWT: {
        noToken: 'No token provided!',
        unauthorized: 'Unauthorized!',
        requireAdmin: 'Require Admin Role!'
      }
    },
    tickets: { canNotFindTicket: 'Can not find the ticket!' },
    todos: { canNotFindTodo: 'Can not find the todo!' }
  }
}
