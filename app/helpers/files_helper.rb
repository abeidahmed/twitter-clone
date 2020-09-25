module FilesHelper
  def get_file_url(file_location, **options)
    width = options[:width]
    height = options[:height]
    crop = options[:crop]
    gravity = options[:gravity]
    return nil if file_location.nil?

    cl_image_path(
      File.basename(file_location).to_s,
      width: width,
      height: height,
      crop: crop,
      gravity: gravity
    )
  end
end