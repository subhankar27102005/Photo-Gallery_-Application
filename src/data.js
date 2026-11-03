const photos = [
  { id: 1, title: "nature", category: "nature", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1d6Gd2u9hEHn_WdD841XD-207iVSWEy1BwUloWHFRgg&s=10"},
  { id: 2, title: "nature", category: "nature", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhNqeEjuDS4BmJ1XfDNHv1exUGaaMoHVFrnVtSqfpHCQ&s=10" },
  { id: 3, title: "travels", category: "travel", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGlVJU2pcvR241AmRIsuvpY8ybAkqCagYXesGopmF8Ww&s=10" },
  { id: 4, title: "travels", category: "travel", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF1tYtGciSEWTIwzbZ-yKHSQa0pKqQfn8pRthlN6ViNA&s=10" },
  {id:5,title:"travels",category:"travel",url:"https://www.moxeemarketing.com/wp-content/uploads/2023/08/Long-boat-and-rocks-on-railay-beach-in-Krabi-Thailand.jpg"},

  { id: 6, title: "City", category: "city", url: "https://media.istockphoto.com/id/1164517176/photo/historic-howrah-bridge-with-boat-on-river-ganges-at-kolkata-india.jpg?s=612x612&w=0&k=20&c=aZX8zvFV5O1qtoWnv-gPtiW1eRPlUHeK_vjh87qLMU8=" },
  { id: 7, title: "City", category: "city", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzf6iL004g09QeSLssStQNRAB4N9Y2Hnv8mVC-WkgcEUdJK9WxPppbZN8&s=10" },

  { id: 8, title: "animals", category: "animals", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9S6FRO6aBXft913Ons-Ssmeaow573XGtXhiDPmDSJRA&s=10" },
  { id: 9, title: "animals", category: "animals", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZyZhgR7A1JBW14HaHk1Q56mCYiqFTH7tqwIHVadQ_g&s=10" },
  { id: 10, title: "animals", category: "animals", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT4T-1oO5whs_hLF9YE_EFWlASxAJ_tdJ7zky_EyLtVXhHXFIq67zlY4a1&s=10" },
  { id: 11, title: "animals", category: "animals", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1xB4Bc_uH6y95cPMqhqu9R13B6efL-5bwH6SKxDtkkQ&s=10" },

  {id:12,title:"vehicles",category:"vehicles",url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMnMaGxLluyIrZp0-exFV4GT63mLOV246CT9MmLJEXdg&s=10"},
  {id:13,title:"vehicles",category:"vehicles",url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEj38WjW3Sc-s-xyDEDcIhd6jpOqb01QKWNU3UsgDX7Q&s=10"},

  { id: 14, title: "Mountains", category: "Mountains", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0jgu4Yk1LvoGxuZNjQtuIFLykgMhoVwIhVt3Hg1rR_A&s=10" },
  { id: 15, title: "Mountains", category: "Mountains", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcB_Jg5es_QUB4KFCCy-2LFmQOQLEEpSIppojP2eHQmg&s=10" },

  { id: 16, title: "food", category: "food", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwblbNNpafqsV3AcmYbiuGkBVnBzP_cpRormOnPfjkQ&s=10" },
  { id: 17, title: "food", category: "food", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkod9gNP5aM0yYGkj4MCyqyxH_mODnLSv9CAlAWsL2bw&s=10" },

  { id: 18, title: "Football", category: "Football", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNCsejLcwsyEaCpwbHKM26Q9fJmhmhKw8YYfUjhGv36w&s=10" },
  { id: 19, title: "Football", category: "Football", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeU8Ag_Fmp5I8XZ5OZuvA87dWKqF1NWGXxbYx9Su81iw&s=10 "},

  { id: 20, title: "Laptop", category: "Laptop", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS639V8bbCFHHu1QQMTFlL3Nqgt6nwEQis6Km7-TgBnNQ&s=10" },
  { id: 21, title: "Laptop", category: "Laptop", url: "https://www.itaf.eu/wp-content/uploads/2021/01/Best-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg" },

    { id: 22, title: "Fashion", category: "Fashion", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhgttQ6wW0dxwHWYHW16qy879MitKWxLeN5nwegXQy7w&s" },
  { id: 23, title: "Fashion", category: "Fashion", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxcA1KkBHXK-qbF8hlo83liespkJgvyxbGgdnnxmP7TA&s" },
    { id: 24, title: "Fashion", category: "Fashion", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW5TGdtH1ZPhO6eKHTdCt-GnGVY9NLmNFbZ1ydxtpWA&s=10" }



];

export default photos ;