"""

	Laburo estimate of the best workspace offer among different options for a given booking request
	V1.0 by  Angel T
	22 July 2019

"""

import datetime

class SpaceOffer:

	# Booking hour rules for Multiburo - check not implemented yet
	openingtime =  datetime.time(8,30)
	endtimemorning =  datetime.time(13,0)
	starttimeafternoon = datetime.time(13,30)
	closingtime = datetime.time(19,0) # 18:00 on Fridays!

	# Also not yet checking room availability against a GCal url

	def __init__(self, offerid, spacename, spacetype, pricingtype, maxcapacity, priceday, pricehalfday, pricehour, availability):
		self.offerid = offerid
		self.spacename = spacename
		self.spacetype = spacetype # 'h' for hotdesk, 'p' for  private  office, 'm' for  meeting  room, 's' for seminar 
		self.pricingtype = pricingtype # 'f' for fix price per duration, 'p" for price per person per duration
		self.maxcapacity = maxcapacity
		self.priceday = priceday	
		self.pricehalfday = pricehalfday	
		self.pricehour =  pricehour
		self.availability = availability
	def displaySpacetype(self):
		print(self.spacetype)

class Center:
	def __init__(self, centerid, name, spaceofferportfolio):
		self.center = centerid
		self.name =  name
		self.spaceofferportfolio = spaceofferportfolio

class Booking:
	def __init__(self, bookingid, horodateur, chosencenter, who, startdatetime, enddatetime, what, howmany):
		self.bookingid = bookingid
		self.horodateur = horodateur
		self.chosencenter = chosencenter
		self.who = who
		self.startdatetime = startdatetime
		self.enddatetime =  enddatetime
		self.what = what
		self.howmany = howmany
	def getDurationinhours(self):
		duration = self.enddatetime - self.startdatetime
		txtduration = str(duration)
		txtdurationhours, txtdurationminutes, txtseconds = txtduration.split(':')
		durationhours = int(txtdurationhours)
		durationminutes = int(txtdurationminutes)
		if durationminutes > 30:
			durationhours = durationhours+1
			durationminutes = 0
		elif durationminutes == 0:
			pass
		else:
			durationminutes = 30
		equivalentduration = datetime.timedelta(hours=durationhours, minutes=durationminutes)
		equivalentdurationinhours = durationhours + durationminutes/60
		return equivalentdurationinhours
	def bestOfferperday(self): # assumes best offer is the less expensive per day
		eligiblepertype = []
		eligiblepercapacity = []
		count = 0
		for obj in self.chosencenter.spaceofferportfolio:
			if(obj.spacetype == self.what ):
				eligiblepertype.append(obj)
		for obj in eligiblepertype:
			if(obj.maxcapacity >= self.howmany):
				eligiblepercapacity.append(obj)
				count = count+1
		if(count == 0):
			print("No offer available in this Center")
			return 0
		bestpriceday=eligiblepercapacity[0].priceday
		for obj in eligiblepercapacity:
			if(obj.priceday < bestpriceday):
				bestpriceday = obj.priceday	
		return obj	
	def bestOffer(self):
		selectedspaceoffer=self.bestOfferperday()
		durationinhours = self.getDurationinhours()
		personmultiplier = 1
		priceestimate = selectedspaceoffer.priceday
		if(selectedspaceoffer.pricingtype == "p"):  # per person?
			personmultiplier =  self.howmany
		if(selectedspaceoffer.pricehour != ""):
			priceestimate = float(selectedspaceoffer.pricehour)*durationinhours
			if(priceestimate > selectedspaceoffer.priceday):
				priceestimate = selectedspaceoffer.priceday
		if(selectedspaceoffer.pricehalfday != ""):
			if(priceestimate > selectedspaceoffer.pricehalfday):
				priceestimate  = selectedspaceoffer.pricehalfday	
		return priceestimate * personmultiplier
	def estimatePrice(self, targetspace):
		pass
	def displayEstimatePrice(self):
		bestoffer=self.bestOfferperday()
		if(bestoffer):
			print("\n", self.who,"requested a", self.what, "for", self.howmany, "persons\nbetween ", self.startdatetime, "\nand", self.enddatetime)
			print("\nESTIMATE PRICE is ", self.bestOffer(), "€ excl tax")
			print("Room",  bestoffer.spacename, "at", self.chosencenter.name, "\nMax. capacity:", bestoffer.maxcapacity, "persons") 
 
if __name__ == "__main__":

	# Creates two space offers
	ActualOffer1 = SpaceOffer(111, "Venice", "m", "f", 7, 50,13.5,5, 1)
	ActualOffer2 = SpaceOffer(112, "Rome", "m", "f", 9, 14, 12,6.5, 1)

	# Creates a center including those two space offers
	ActualCenter = Center(1, "LMDC", [ActualOffer1, ActualOffer2])

	# Creates a booking request for the given workspace site 
	# Need is: "meeting room  for 3  people 27 July, between  11:00  and 16:30"
	ActualBooking = Booking (1, datetime.datetime.now(),
		ActualCenter, "useremailaddress",
		datetime.datetime(2019, 7, 27, 11, 0), datetime.datetime(2019, 7, 27, 16, 30),
		"m", 7)
	#  Display estimate for best offer obtained for such a booking request
	ActualBooking.displayEstimatePrice()
