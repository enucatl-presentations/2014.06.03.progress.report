guard :shell do
    watch(/^index\.haml$/) do |m|
        m.each do |file|
            puts "Matched with '#{m}'"
            `haml #{file} #{file.gsub("haml", "html")}`
        end
    end
end

guard 'coffeescript', :input => 'lib', :output => 'js', :shallow => true
guard 'coffeescript', :input => 'coffee', :output => 'js', :shallow => true
