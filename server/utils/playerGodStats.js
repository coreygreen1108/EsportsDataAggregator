module.exports = {
	getKDA: function(obj){
		return (obj.Kills + obj.Assists) / obj.Deaths;
	},
	getWinPercentage: function(obj){
		return obj.Wins / (obj.Wins + obj.Losses);
	},
	getPowerScore: function(obj){
		return obj.Kills + obj.Wins + (.5 * obj.Assists) / (obj.Losses * obj.Deaths);
	}
}