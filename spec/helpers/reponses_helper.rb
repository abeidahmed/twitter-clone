module ResponsesHelper
  def json
    JSON.parse(response.body, symbolize_names: true)
  end

  def default_header
    {
      "Authorization" => nil,
      "Content-Type" => "application/json"
    }
  end
end