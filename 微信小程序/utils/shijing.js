const shijing = [
  "关关雎鸠，在河之洲。窈窕淑女，君子好逑。",
  "参差荇菜，左右流之。窈窕淑女，寤寐求之。",
  "求之不得，寤寐思服。悠哉悠哉，辗转反侧。",
  "参差荇菜，左右采之。窈窕淑女，琴瑟友之。",
  "参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。",
  "葛之覃兮，施于中谷，维叶萋萋。黄鸟于飞，集于灌木，其鸣喈喈。",
  "葛之覃兮，施于中谷，维叶莫莫。是刈是濩，为絺为绤，服之无斁。",
  "言告师氏，言告言归。薄污我私，薄浣我衣。害浣害否，归宁父母。",
  "采采卷耳，不盈顷筐。嗟我怀人，置彼周行。",
  "陟彼崔嵬，我马虺隤。我姑酌彼金罍，维以不永怀。",
  "陟彼高冈，我马玄黄。我姑酌彼兕觥，维以不永伤。",
  "陟彼砠矣，我马瘏矣，我仆痡矣，云何吁矣。",
  "南有樛木，葛藟累之。乐只君子，福履绥之。",
  "南有樛木，葛藟荒之。乐只君子，福履将之。",
  "南有樛木，葛藟萦之。乐只君子，福履成之。",
  "螽斯羽，诜诜兮。宜尔子孙，振振兮。",
  "螽斯羽，薨薨兮。宜尔子孙。绳绳兮。",
  "螽斯羽，揖揖兮。宜尔子孙，蛰蛰兮。",
  "桃之夭夭，灼灼其华。之子于归，宜其室家。",
  "桃之夭夭，有蕡其实。之子于归，宜其家室。",
  "桃之夭夭，其叶蓁蓁。之子于归，宜其家人。",
  "肃肃兔罝，椓之丁丁。赳赳武夫，公侯干城。",
  "肃肃兔罝，施于中逵。赳赳武夫，公侯好仇。",
  "肃肃免罝，施于中林。赳赳武夫，公侯腹心。",
  "采采芣苡，薄言采之。采采芣苡，薄言有之。",
  "采采芣苡，薄言掇之。采采芣苡，薄言捋之。",
  "采采芣苡，薄言袺之。采采芣苡，薄言襭之。",
  "南有乔木，不可休息。汉有游女，不可求思。汉之广矣，不可泳思。江之永矣，不可方思。",
  "翘翘错薪，言刈其楚。之子于归，言秣其马。汉之广矣，不可泳思。江之永矣，不可方思。",
  "翘翘错薪，言刈其蒌。之子于归。言秣其驹。汉之广矣，不可泳思。江之永矣，不可方思。",
  "遵彼汝坟，伐其条枚。未见君子，惄如调饥。",
  "遵彼汝坟，伐其条肄。既见君子，不我遐弃。",
  "鲂鱼赪尾，王室如毁。虽则如毁，父母孔迩。",
  "麟之趾，振振公子，于嗟麟兮。",
  "麟之定，振振公姓，于嗟麟兮。",
  "麟之角，振振公族，于嗟麟兮。",
  "维鹊有巢，维鸠居之。之子于归，百两御之。",
  "维鹊有巢，维鸠方之。之子于归，百两将之。",
  "维鹊有巢，维鸠盈之。之子于归，百两成之。",
  "于以采蘩？于沼于沚。于以用之？公侯之事。",
  "于以采蘩？于涧之中。于以用之？公侯之宫。",
  "被之僮僮，夙夜在公。被之祁祁，薄言还归。",
  "喓喓草虫，趯趯阜螽。未见君子，忧心忡忡。亦既见止，亦既觏止，我心则降。",
  "陟彼南山，言采其蕨。未见君子，忧心惙惙。亦既见止，亦既觏止，我心则说。",
  "陟彼南山，言采其薇。未见君子，我心伤悲。亦既见止，亦既觏止，我心则夷。",
  "于以采蘋？南涧之滨。于以采藻？于彼行潦。",
  "于以盛之？维筐及筥。于以湘之？维锜及釜。",
  "于以奠之？宗室牖下。谁其尸之？有齐季女。",
  "蔽芾甘棠，勿剪勿伐，召伯所茏。",
  "蔽芾甘棠，勿剪勿败，召伯所憩。",
  "蔽芾甘棠，勿剪勿拜，召伯所说。",
  "厌浥行露，岂不夙夜，谓行多露。",
  "谁谓雀无角？何以穿我屋？谁谓女无家？何以速我狱？虽速我狱，室家不足！",
  "谁谓鼠无牙？何以穿我墉？谁谓女无家？何以速我讼？虽速我讼，亦不女从！",
  "羔羊之皮，素丝五紽。退食自公，委蛇委蛇。",
  "羔羊之革，素丝五緎。委蛇委蛇，自公退食。",
  "羔羊之缝，素丝五总。委蛇委蛇，退食自公。",
  "殷其雷，在南山之阳。何斯违斯，莫敢或遑？振振君子，归哉归哉！",
  "殷其雷，在南山之侧。何斯违斯，莫敢遑息？振振君子，归哉归哉！",
  "殷其雷，在南山之下。何斯违斯，莫或遑处？振振君子，归哉归哉！",
  "摽有梅，其实七兮。求我庶士，迨其吉兮。",
  "摽有梅，其实三兮。求我庶士，迨其今兮。",
  "摽有梅，顷筐塈之。求我庶士，迨其谓之。",
  "嘒彼小星，三五在东。肃肃宵征，夙夜在公。实命不同！",
  "嘒彼小星，维参与昴。肃肃宵征，抱衾与裯。实命不犹！",
  "江有汜，之子归，不我以。不我以，其后也悔。",
  "江有渚，之子归，不我与。不我与，其后也处。",
  "江有沱，之子归，不我过。不我过，其啸也歌。",
  "野有死麕，白茅包之。有女怀春，吉士诱之。",
  "林有朴，野有死鹿。白茅纯束，有女如玉。",
  "舒而脱脱兮，无感我帨兮，无使尨也吠。",
  "何彼襛矣，唐棣之华？曷不肃雍？王姬之车。",
  "何彼襛矣，华如桃李？平王之孙，齐侯之子。",
  "其钓维何？维丝伊缗。齐侯之子，平王之孙。",
  "彼茁者葭，一发五豝，于嗟乎驺虞！",
  "彼茁者蓬，一发五豵，于嗟乎驺虞！",
  "泛彼柏舟，亦泛其流。耿耿不寐，如有隐忧。微我无酒，以敖以游。",
  "我心匪鉴，不可以茹。亦有兄弟，不可以据。薄言往诉，逢彼之怒。",
  "我心匪石，不可转也。我心匪席，不可卷也。威仪棣棣，不可选也。",
  "忧心悄悄，愠于群小。觏闵既多，受侮不少。静言思之，寤辟有摽。",
  "日居月诸，胡迭而微？心之忧矣，如匪浣衣。静言思之，不能奋飞。",
  "绿兮衣兮，绿衣黄裹。心之忧矣，曷维其已！",
  "绿兮衣兮，绿衣黄裳。心之忧矣，曷维其亡！",
  "绿兮丝兮，女所治兮。我思古人，俾无訧兮！",
  "絺兮绤兮，凄其以风。我思古人，实获我心！",
  "燕燕于飞，差池其羽。之子于归，远送于野。瞻望弗及，泣涕如雨。",
  "燕燕于飞，颉之颃之。之子于归，远于将之。瞻望弗及，伫立以泣。",
  "燕燕于飞，下上其音。之子于归，远送于南。瞻望弗及，实劳我心。",
  "仲氏任只，其心塞渊。终温且惠，淑慎其身。先君之思，以勖寡人。",
  "日居月诸，照临下土。乃如之人兮，逝不古处？胡能有定？宁不我顾。",
  "日居月诸，下土是冒。乃如之人兮，逝不相好。胡能有定？宁不我报。",
  "日居月诸，出自东方。乃如之人兮，德音无良。胡能有定？俾也可忘。",
  "日居月诸，东方自出。父兮母兮，畜我不卒。胡能有定？报我不述。",
  "终风且暴，顾我则笑，谑浪笑敖，中心是悼。",
  "终风且霾，惠然肯来，莫往莫来，悠悠我思。",
  "终风且曀，不日有曀，寤言不寐，愿言则嚏。",
  "曀曀其阴，虺虺其雷，寤言不寐，愿言则怀。",
  "击鼓其镗，踊跃用兵。土国城漕，我独南行。",
  "从孙子仲，平陈与宋。不我以归，忧心有忡。",
  "爰居爰处？爰丧其马？于以求之？于林之下。",
  "死生契阔，与子成说。执子之手，与子偕老。",
  "于嗟阔兮，不我活兮。于嗟洵兮，不我信兮。",
  "凯风自南，吹彼棘心。棘心夭夭，母氏劬劳。",
  "凯风自南，吹彼棘薪。母氏圣善，我无令人。",
  "爰有寒痊在浚之下。有子七人，母氏劳苦。",
  "睍睆黄鸟，载好其音。有子七人，莫慰母心。",
  "雄雉于飞，泄泄其羽。我之怀矣，自诒伊阻。",
  "雄雉于飞，下上其音。展矣君子，实劳我心。",
  "瞻彼日月，悠悠我思。道之云远，曷云能来？",
  "百尔君子，不知德行。不忮不求，何用不臧。",
  "匏有苦叶，济有深涉。深则厉，浅则揭。",
  "有瀰济盈，有鷕雉鸣。济盈不濡轨，雉鸣求其牡。",
  "雍雍鸣雁，旭日始旦。士如归妻，迨冰未泮。",
  "招招舟子，人涉卬否。不涉卬否，卬须我友。"
]

module.exports = {
  shijing
}