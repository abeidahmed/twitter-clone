module DateTimeHelper
  def format_date(current_date, **options)
    if options[:type] == 'short'
      current_date.strftime('%b %d')
    else
      current_date.strftime('%B %Y')
    end
  end
end