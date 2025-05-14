'use strict'


// data

const musicFiles = ["advertising-background-music-317486.mp3",
    "advertising-music-promo-showreel-trailer-background-intro-theme-272189.mp3",
    "africa-music-ethiopia-kenya-nigeria-tanzania-cameroon-safari-tribe-269374.mp3",
    "ambient-nature-landscape-music-296237.mp3",
    "arabic-islamic-ramadan-music-292981.mp3",
    "asia-music-chinese-new-year-asian-china-background-intro-theme-269847.mp3",
    "awards-ceremony-music-victory-nomination-winner-champions-background-274861.mp3",
    "battle-fight-music-dynamic-warrior-background-intro-theme-272176.mp3",
    "calm-piano-music-sentimental-background-intro-theme-269137.mp3",
    "chinese-lunar-new-year-music-283891.mp3",
    "christmas-eve-music-celebration-holiday-background-intro-theme-271541.mp3",
    "cinematic-ambient-inspirational-music-289854.mp3",
    "cinematic-music-dramatic-emotional-soundtrack-background-intro-theme-277978.mp3",
    "cinematic-suspense-music-tension-scary-horror-trailer-background-274542.mp3",
    "clinic-medical-music-healthcare-mental-health-background-intro-272193.mp3",
    "comedy-funny-cartoon-background-music-316870.mp3",
    "comedy-music-funny-quirky-cunning-silly-background-intro-theme-274541.mp3",
    "comedy-music-funny-quirky-cunning-silly-background-memes-intro-theme-288059.mp3",
    "cooking-food-advertising-background-music-312872.mp3",
    "cooking-food-advertising-promo-music-303331.mp3",
    "cooking-food-background-music-301369.mp3",
    "cooking-food-vlog-background-intro-music-285708.mp3",
    "corporate-background-music-314202.mp3",
    "corporate-background-music-economy-marketing-business-intro-theme-277974.mp3",
    "corporate-business-background-music-309508.mp3",
    "corporate-medical-background-music-304282.mp3",
    "corporate-music-business-finance-presentation-background-intro-theme-269382.mp3",
    "corporate-music-optimistic-business-success-background-intro-theme-278388.mp3",
    "cyberpunk-music-neon-industrial-ai-game-286971.mp3",
    "documentary-music-history-ambient-film-background-intro-theme-270172.mp3",
    "documentary-nature-music-312871.mp3",
    "dubstep-music-hype-hipster-opener-promo-showreel-background-intro-274575.mp3",
    "education-background-music-school-university-college-intro-theme-277968.mp3",
    "education-music-knowledge-learning-study-background-intro-theme-272223.mp3",
    "educational-corporate-music-301376.mp3",
    "emotional-epic-music-315655.mp3",
    "emotional-piano-music-322389.mp3",
    "emotional-sad-piano-music-319568.mp3",
    "energetic-promo-music-fast-opener-dynamic-background-intro-theme-274855.mp3",
    "energetic-sport-rock-music-297521.mp3",
    "epic-music-cinematic-heroic-orchestral-background-trailer-intro-278387.mp3",
    "epic-uplifting-cinematic-music-304286.mp3",
    "epic-uplifting-inspiration-music-303827.mp3",
    "epic-war-music-army-military-hero-soldier-theme-intro-background-274862.mp3",
    "event-promo-music-exciting-business-conference-background-intro-278386.mp3",
    "exciting-upbeat-background-music-300654.mp3",
    "exciting-upbeat-happy-background-music-303833.mp3",
    "feel-good-spring-easter-music-322049.mp3",
    "football-music-soccer-stadium-fans-match-game-background-intro-theme-274852.mp3",
    "france-music-french-accordion-paris-background-intro-theme-277989.mp3",
    "fun-exciting-travel-background-music-316880.mp3",
    "fun-upbeat-background-music-321170.mp3",
    "funny-cartoon-comedy-background-music-298330.mp3",
    "funny-cartoon-comedy-background-music-306997.mp3",
    "funny-comedy-cartoon-background-music-294730.mp3",
    "funny-comedy-memes-music-comic-humor-joke-background-intro-theme-288430.mp3",
    "funny-comedy-memes-music-humor-comic-background-intro-theme-272171.mp3",
    "funny-comedy-music-cartoon-animation-background-intro-theme-277932.mp3",
    "funny-comedy-quirky-cartoon-background-music-296558.mp3",
    "funny-kids-music-298322.mp3",
    "funny-pets-cats-dogs-music-318675.mp3",
    "gaming-music-8-bit-console-play-background-intro-theme-278382.mp3",
    "gospel-worship-christian-church-music-323163.mp3",
    "happy-birthday-323162.mp3",
    "happy-birthday-cute-funny-ukulele-background-music-intro-song-278378.mp3",
    "happy-birthday-music-300687.mp3",
    "happy-birthday-song-background-music-295823.mp3",
    "happy-jazz-music-casino-poker-black-jack-roulette-background-intro-269848.mp3",
    "happy-jazz-whiskey-bar-coctail-drink-alcohol-backround-music-intro-277988.mp3",
    "happy-kids-music-292759.mp3",
    "happy-kids-music-child-baby-todler-kindergarten-background-intro-269361.mp3",
    "healthcare-music-insurance-safe-protection-background-intro-theme-269381.mp3",
    "indian-bollywood-holi-hindi-song-music-305535.mp3",
    "inspiring-cinematic-ambient-documentary-music-289860.mp3",
    "inspiring-emotional-piano-music-302981.mp3",
    "inspiring-uplifting-music-motivational-background-intro-theme-278380.mp3",
    "international-womanx27s-day-306450.mp3",
    "interview-music-podcast-intro-jingle-vlog-background-theme-278391.mp3",
    "jazz-lounge-elevator-music-322314.mp3",
    "kids-cartoon-289153.mp3",
    "kids-cartoon-music-289450.mp3",
    "kids-children-background-music-281821.mp3",
    "kids-game-gaming-background-music-295075.mp3",
    "kids-happy-music-320636.mp3",
    "kids-music-286663.mp3",
    "kids-show-music-children-funny-playful-background-intro-theme-277987.mp3",
    "learning-music-education-student-knowledge-background-intro-theme-270174.mp3",
    "lofi-chill-background-music-313055.mp3",
    "lofi-relaxing-chill-music-295834.mp3",
    "magic-mystery-harry-potter-music-320643.mp3",
    "medical-background-music-clinic-doctor-health-pharmacy-intro-theme-285344.mp3",
    "medical-background-music-doctor-clinic-health-pharmacy-intro-theme-269141.mp3",
    "medical-corporate-background-music-306447.mp3",
    "meditation-music-289149.mp3",
    "meditation-relax-sleep-music-311900.mp3",
    "motivation-sports-music-298433.mp3",
    "motivational-upbeat-music-291373.mp3",
    "pets-music-funny-happy-dogs-cats-kitty-puppy-background-intro-theme-272185.mp3",
    "phonk-tiktok-instagram-music-10-seconds-version-for-viral-videos-320453.mp3",
    "phonk-tiktok-instagram-music-20-seconds-version-for-viral-videos-320451.mp3",
    "phonk-tiktok-instagram-music-320450.mp3",
    "phonk-tiktok-instagram-youtube-music-303287.mp3",
    "playful-kids-music-joy-smile-funny-child-background-intro-theme-269850.mp3",
    "podcast-background-interview-vlog-intro-jingle-theme-music-278389.mp3",
    "podcast-corporate-background-music-295052.mp3",
    "podcast-interview-background-music-299016.mp3",
    "podcast-music-funk-tv-show-intro-background-theme-series-278383.mp3",
    "product-launch-advertising-commercial-music-301409.mp3",
    "product-launch-commercial-advertising-music-323265.mp3",
    "product-presentation-advertisement-music-320720.mp3",
    "promo-background-music-opener-energetic-dynamic-advertising-showreel-277971.mp3",
    "promo-music-showreel-trailer-demo-ads-background-intro-theme-270169.mp3",
    "ramadan-eid-mubarak-background-music-320769.mp3",
    "real-estate-background-hotel-property-advertising-commercial-music-277938.mp3",
    "real-estate-background-music-upbeat-corporate-business-intro-theme-277939.mp3",
    "real-estate-music-property-agency-presentation-open-house-background-269852.mp3",
    "relax-sleep-music-312598.mp3",
    "roblox-minecraft-fortnite-video-game-music-299145.mp3",
    "romantic-wedding-background-music-303830.mp3",
    "sad-documentary-music-hopeful-melancholy-background-intro-theme-274857.mp3",
    "sad-dramatic-piano-background-music-song-295838.mp3",
    "soft-piano-instrumental-music-320630.mp3",
    "spring-easter-day-music-319084.mp3",
    "stomps-amp-claps-energetic-rhythmic-dynamic-background-music-277937.mp3",
    "tech-music-corporate-business-ai-technology-science-background-intro-277940.mp3",
    "technology-background-music-science-corporate-ai-intro-theme-277996.mp3",
    "technology-music-innovation-app-ai-tech-background-intro-theme-269140.mp3",
    "tense-suspense-background-music-30-seconds-version-320446.mp3",
    "tense-suspense-background-music-80-seconds-version-320442.mp3",
    "tense-suspense-background-music-320439.mp3",
    "travel-upbeat-music-happy-fun-exciting-background-intro-theme-278384.mp3",
    "upbeat-corporate-motivational-music-291427.mp3",
    "upbeat-corporate-music-292756.mp3",
    "upbeat-energetic-happy-background-music-307007.mp3",
    "upbeat-future-bass-trailer-showreel-promo-background-intro-theme-272170.mp3",
    "upbeat-happy-music-fun-pop-travel-background-music-for-videos-274545.mp3",
    "upbeat-hip-hop-beat-281283.mp3",
    "upbeat-hip-hop-vlog-music-293512.mp3",
    "upbeat-inspirational-music-296908.mp3",
    "upbeat-jazz-music-restaurant-hotel-bar-cafe-backgorund-intro-theme-269854.mp3",
    "upbeat-motivation-music-292747.mp3",
    "upbeat-motivational-music-289762.mp3",
    "uplifting-inspirational-music-299051.mp3",
    "uplifting-inspiring-background-music-303176.mp3",
    "war-battle-military-drums-318680.mp3",
    "war-music-army-military-battlefield-background-intro-theme-270166.mp3",
    "we-wish-you-a-merry-christmas-happy-remix-background-intro-theme-277943.mp3",
    "wedding-music-love-story-romantic-piano-background-intro-theme-270165.mp3",
    "wedding-romantic-love-music-282316.mp3",
    "whimsical-music-funny-comedy-awkward-memes-humor-background-277964.mp3"]

let musicFile = {}
musicFiles.forEach((string) =>{
    musicFile[string] = new Audio()
    musicFile[string].src = `Music/${string}`
    musicFile[string].loop = true

})

let music ={
    current: 'uplifting-inspiring-background-music-303176.mp3',
    hasChanged: false,
    isMuted: false,
    playMusic: function(){
        if (this.hasChanged === false){
            return;
        }
        if (this.isMuted){
            musicFile[this.current].pause()
        }
        else {
            musicFile[this.current].play()
        }
        this.hasChanged = false
    },
    changeMusic : function (name){
        if (name === this.current){
            return;
        }
        musicFile[this.current].pause()
        this.current = name
        if (this.isMuted){
            musicFile[this.current].pause()
        }
        else {
            musicFile[this.current].play()
        }
        this.hasChanged = true
    }, 
    muteMusic: function(value = 'off'){
        if (value === 'off'){
            this.isMuted = true
            musicFile[this.current].pause()
        }
        else if (value === 'on'){
            this.isMuted = false
            musicFile[this.current].play()
        }
    }
}

const musicTitleScreen = 'comedy-music-funny-quirky-cunning-silly-background-intro-theme-274541.mp3'
const musicLimoges = 'funny-pets-cats-dogs-music-318675.mp3'
const musicRoad = 'spring-easter-day-music-319084.mp3'
const musicBiarritz = 'happy-birthday-song-background-music-295823.mp3'
const musicPassage = 'tense-suspense-background-music-320439.mp3'
const musicMart = 'upbeat-jazz-music-restaurant-hotel-bar-cafe-backgorund-intro-theme-269854.mp3'
const musicPool = 'corporate-music-optimistic-business-success-background-intro-theme-278388.mp3'
const musicBikeShop = 'chinese-lunar-new-year-music-283891.mp3'
const musicHarbour = 'cyberpunk-music-neon-industrial-ai-game-286971.mp3'
const musicHouse = 'stomps-amp-claps-energetic-rhythmic-dynamic-background-music-277937.mp3'
const musicMuseum = 'africa-music-ethiopia-kenya-nigeria-tanzania-cameroon-safari-tribe-269374.mp3'
const musicHospital = 'corporate-medical-background-music-304282.mp3'
const musicElevator = 'jazz-lounge-elevator-music-322314.mp3'
const musicCave = 'magic-mystery-harry-potter-music-320643.mp3'
const musicPast = 'meditation-music-289149.mp3'
const musicDarkTimes = 'tense-suspense-background-music-320439.mp3'






