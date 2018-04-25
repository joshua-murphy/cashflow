print "Seeding database..."
professions = [
  { title: 'doctor', salary: 13200, expenses: [ { name: "Taxes", amount: 3420 }, { name: "Mortgage Payment", amount: 1900 }, { name: "School Loan Payment", amount: 750 }, { name: "Car Payment", amount: 380 }, { name: "Credit Card Payment", amount: 270}, { name: "Retail Payment", amount: 50 }, { name: "Other", amount: 2880 }  ], childCost: 640, debts: [ { name: "Mortgage", amount: 202000 }, { name: "School Loans", amount: 150000 }, { name: "Car", amount: 19000 }, { name: "Credit Card", amount: 9000 }, { name: "Retail", amount: 1000 }], savings: 400 }
]
success_count = 0
fail_count = 0

professions.each do |p|
  model = Profession.new(title: p[:title], salary: p[:salary], expenses: p[:expenses], childCost: p[:childCost], debts: p[:debts], savings: p[:savings] )
  model.save ? success_count += 1 : fail_count += 1
end
puts "done! \nProfession creations: #{success_count} successful, #{fail_count} failed."