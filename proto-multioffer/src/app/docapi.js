app.get('/api/home', passportConfig.isApiAuthenticated, domainTransaction.welcome);
app.post('/api/forgot', userController.postApiForgot);
app.get('/api/logout', userController.apiLogout);
app.post('/api/logout', userController.apiLogout);
app.post('/api/login', userController.postApiLogin);
app.post('/api/instructor/login', userController.postInstructorLogin);
app.post('/api/reset/:token', userController.postApiReset);
app.post('/api/signup', userController.postApiSignup);
app.get('/api/account/profile', passportConfig.isApiAuthenticated, userController.getApiUpdateProfile);
app.post('/api/account/profile', passportConfig.isApiAuthenticated, userController.postApiUpdateProfile);
app.post('/api/promo', passportConfig.isApiAuthenticated, promoService.postPromo);
app.post('/api/account/profile/photo', passportConfig.isApiAuthenticated, function( req, res, next) {
  userController.postProfilePhoto(upload, req, res, next);
});
app.post('/api/account/password', passportConfig.isApiAuthenticated, userController.postApiUpdatePassword);
app.post('/api/account/delete', passportConfig.isApiAuthenticated, userController.postApiDeleteAccount);

app.post('/api/authorization', passportConfig.isApiAuthenticated, userController.setAuthorization);
app.get('/api/authorization', passportConfig.isApiAuthenticated, userController.getAuthorization);

//Place APi
app.get('/api/place',  placeController.getNear);
app.get('/api/resident/:token', promoService.removeResident);
app.get('/api/manager/:token', promoService.removeManager);
app.put('/api/place/:id/offer', passportConfig.isApiAuthenticated, placeController.setOffer);
app.post('/api/place/:id/offer', passportConfig.isApiAuthenticated, placeController.setOffer);
app.get('/api/place/:id/offer', passportConfig.isApiAuthenticated, placeController.getOffer);
app.get('/api/place/:id/funnel', passportConfig.isApiAuthenticated, placeController.getFunnel);
app.post('/api/place/:id/funnel', passportConfig.isApiAuthenticated, placeController.getFunnel);
app.get('/api/place/:placeId/funnel/:transactionId', passportConfig.isApiAuthenticated, placeController.getFunnelUser);
app.get('/api/transaction/:transactionId/:omId', placeController.getEmailTransaction);

app.post('/api/place/admin', passportConfig.isApiAuthenticated, placeController.admin);
app.delete('/api/place/admin', passportConfig.isApiAuthenticated, placeController.adminOff);

app.get('/api/place/:id', passportConfig.isApiAuthenticated,  placeController.get);

app.get('/api/transaction', passportConfig.isApiAuthenticated, domainTransaction.getTransactions);
app.get('/api/transaction/:id', passportConfig.isApiAuthenticated, domainTransaction.getTransaction);

app.post('/api/place/:id/booking/:offerId', passportConfig.isApiAuthenticated, placeController.newBooks);
app.post('/api/place/:id/booking', passportConfig.isApiAuthenticated, placeController.books);
app.get('/api/transaction/:id/cancel', passportConfig.isApiAuthenticated, transactionController.getCancel);
app.post('/api/transaction/:id/cancel', passportConfig.isApiAuthenticated, transactionController.postCancel);
app.post('/api/transaction/:id/decline', passportConfig.isApiAuthenticated, transactionController.postCancel);
app.post('/api/transaction/:id/instructor/decline', passportConfig.isApiAuthenticated, transactionController.postInstructorCancel);

app.post('/api/transaction/:id/confirm', passportConfig.isApiAuthenticated, transactionController.postConfirm);
app.post('/api/transaction/:id/instructor/confirm', passportConfig.isApiAuthenticated, transactionController.postInstructorConfirm);
app.post('/api/transaction/:id/checkin', passportConfig.isApiAuthenticated, transactionController.postCheckIn);
app.post('/api/transaction/:id/checkin/:userId', transactionController.postEmailCheckIn);
app.post('/api/transaction/:id/instructor/checkin', passportConfig.isApiAuthenticated, transactionController.postInstructorCheckIn);
app.post('/api/transaction/:id/checkout', passportConfig.isApiAuthenticated, transactionController.postCheckOut);
app.post('/api/transaction/:id/rate', passportConfig.isApiAuthenticated, transactionController.postRate);

app.get('/api/user/:id', passportConfig.isApiAuthenticated, userController.getUserProfile);
app.get('/api/user', passportConfig.isApiAuthenticated, userController.getMyProfile);

app.post('/api/chat', passportConfig.isApiAuthenticated, pushService.postChat);
app.get('/api/chat', passportConfig.isApiAuthenticated, pushService.getChats);
app.get('/api/chat/:userId', passportConfig.isApiAuthenticated, pushService.getChat);
app.get('/api/user/:userId/chat', passportConfig.isApiAuthenticated, pushService.getChat);
app.post('/api/chat/:messageId/ack', passportConfig.isApiAuthenticated, pushService.ackChatMessage);
app.get('/api/chat/:messageId/ack', passportConfig.isApiAuthenticated, pushService.ackChatMessage);

app.get('/api/chat/user', passportConfig.isApiAuthenticated, pushService.getChatUsers);

app.post('/api/card', passportConfig.isApiAuthenticated, paymentService.postCard);
app.get('/api/card', passportConfig.isApiAuthenticated, paymentService.getCards);
app.get('/api/card/:id', passportConfig.isApiAuthenticated, paymentService.getCard);
app.delete('/api/card/:id', passportConfig.isApiAuthenticated, paymentService.deleteCard);
app.post('/api/card/:id/default', passportConfig.isApiAuthenticated, paymentService.defaultCard);

app.post('/api/transaction/:id/checkout', passportConfig.isApiAuthenticated, transactionController.postCheckOut);
app.post('/api/transaction/:id/rate', passportConfig.isApiAuthenticated, transactionController.postRate);

app.get('/api/user/:id', passportConfig.isApiAuthenticated, userController.getUserProfile);
app.get('/api/user', passportConfig.isApiAuthenticated, userController.getMyProfile);

app.post('/api/chat', passportConfig.isApiAuthenticated, pushService.postChat);
app.get('/api/chat', passportConfig.isApiAuthenticated, pushService.getChats);
app.get('/api/chat/:userId', passportConfig.isApiAuthenticated, pushService.getChat);
app.get('/api/user/:userId/chat', passportConfig.isApiAuthenticated, pushService.getChat);
app.post('/api/chat/:messageId/ack', passportConfig.isApiAuthenticated, pushService.ackChatMessage);
app.get('/api/chat/:messageId/ack', passportConfig.isApiAuthenticated, pushService.ackChatMessage);

app.get('/api/chat/user', passportConfig.isApiAuthenticated, pushService.getChatUsers);

app.post('/api/card', passportConfig.isApiAuthenticated, paymentService.postCard);
app.get('/api/card', passportConfig.isApiAuthenticated, paymentService.getCards);
app.get('/api/card/:id', passportConfig.isApiAuthenticated, paymentService.getCard);
app.delete('/api/card/:id', passportConfig.isApiAuthenticated, paymentService.deleteCard);
app.post('/api/card/:id/default', passportConfig.isApiAuthenticated, paymentService.defaultCard);

app.post('/api/transaction/:id/checkout', passportConfig.isApiAuthenticated, transactionController.postCheckOut);
app.post('/api/transaction/:id/rate', passportConfig.isApiAuthenticated, transactionController.postRate);

app.get('/auth/linkedin', passport.authenticate('linkedin',   { state: 'SOME STATE' , session: false } ));
app.get('/api/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/api/user' }), function(req, res) {
  return domainTransaction.welcome(req, res);