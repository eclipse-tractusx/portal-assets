# Images, Graphics and Diagrams

## Introduction

Web applications use images or graphics for a variety of reasons, such as:

* Enhancing the user experience: Images can make a website or application more visually appealing and engaging for users. They can also convey information quickly and effectively.
* Branding: Images can help establish and reinforce a brand's identity and personality. A well-placed logo or graphic can make a site more memorable and recognizable.
* Product display: Images are often used to showcase products on e-commerce sites, allowing customers to see what they are buying and helping to drive sales.
* Instructional purposes: Images can be used to provide step-by-step instructions or to illustrate complex concepts in a more visual and accessible way.
* Marketing and advertising: Images can be used to promote products, services, or events and can be a powerful tool for attracting and retaining customers.

Overall, images are an important part of web applications as they can help to improve the user experience, convey information more effectively, and enhance the overall branding and marketing efforts of a company.

While images can provide many benefits to web applications, there are also some potential disadvantages to consider:

* Page load times: Images can be large files, which can slow down page load times. This can lead to a poor user experience and may even cause users to abandon the site.
* Bandwidth usage: Images can consume a significant amount of bandwidth, especially if they are high resolution or there are many of them on a page. This can be a concern for users on limited data plans or for sites with a lot of traffic.
* Accessibility issues: Users with visual impairments may have difficulty accessing and understanding images. It is important to provide alternative text descriptions for images to ensure that all users can access the content.
* Storage space: Hosting large numbers of images can require significant storage space, which can be expensive or difficult to manage.
* Copyright issues: Using images without permission or proper attribution can result in legal issues, which can be costly and damaging to a company's reputation.

Overall, it's important to consider these potential drawbacks when incorporating images into web applications and to take steps to mitigate these issues where possible.

<br/>

## File Formats

The three most common image file formats for web pages are SVG, PNG and JPEG. What's the difference? Fundamentally we can distinguish between Vector and Bitmap images.

### Bitmap images

Those are images in a fixed resolution that try to store the image pixel colors in an efficient way. There we have the following:

* JPEG - known to most people as the common format for pictures taken with digital cameras or mobile phones. It uses a lossy compression meaning the image size can be reduced but some details are possibly lost. The quality of the images can be chosen quite freely from 1 to 100 percent. Very useful to find a good tradeoff between file size and image quality. On the downside it doesn't support transparency and tends to show compression artifacts on documents or illustrations that are composed of mostly flat colors.
* PNG - a more versatile loss free image format that also addresses some of JPEGs other issues. It supports two encoding modes
  * RGB - storing the absolute pixel values which results in usually larger file sizes than the other formats.
  * Indexed Colors - very interesting for images that unlike photographs have a limited number of different colors like for example scanned documents. Reducing the image to something like 16 different colors and storing pixels as color index can reduce the file sizes drastically. This option makes PNG the best format for some kinds of images.

### Vector images

SVG follows a complete different approach to store the image information: describing the composition of its elements. Instead of pixel values the image contains (textual) information about the elements like "draw a circle at position x,y with radius r and line width 5 and yellow color". This has two main advantages - not only takes the information usually much less space than the pixels, the image can also be scaled up to any resolution and the lines drawn will be always sharp.

<br/>

### Comparison

| Use for      | SVG | PNG | JPEG |
|--------------|-----|-----|------|
| Icons, Logos |  ✅ |  ❍  |  ❍   |
| Diagrams     |  ✅ |  ❍  |  ❍   |
| Photographs  |  ❌ |  ❍  |  ✅  |
| Documents    |  ❌ |  ✅ |  ❍   |
| Transparency |  ✅ |  ✅ |  ❌  |
| Scaling      |  ✅ |  ❍  |  ❍   |

(usually) ✅ = best, ❍ = possible, ❌ = impossible

<br/>

### Examples

Some examples of different image types in different file formats and encodings:

| Example      | SVG | PNG (RGB) | PNG (Indexed Color) | JPEG (95% Quality) | JPEG (30% Quality) |
|--------------|-----|-----|-----|------|------|
| Icons, Logos | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/icon.svg"/><br/>1,361 bytes | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/icon-rgb.png"/><br/>10,564 bytes | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/icon-i8.png"/><br/>1,831 bytes (8 colors) | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/icon-q95.jpg"/><br/>12,259 bytes | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/icon-q30.jpg"/><br/>4,383 bytes |
| Diagrams | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/diagram.svg"/><br/> 1,831 bytes | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/diagram-rgb.png"/><br/> 34,920 bytes | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/diagram-idx16.png"/><br/> 7,077 bytes (16 colors) | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/diagram-q95.jpg"/><br/> 21,696 bytes | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/diagram-q30.jpg"/><br/> 5,954 bytes |
| Documents | ❌ | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/document-rgb.png"/><br/> 28,603 bytes | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/document-idx12.png"/><br/> 4,138 bytes (12 colors) | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/document-q95.jpg"/><br/> 19,497 bytes | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/document-q30.jpg"/><br/> 5,884 bytes |
| Photographs | ❌ | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/photo-rgb.png"/><br/> 118,325 bytes | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/photo-idx128.png"/><br/> 24,973 bytes (128 colors) | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/photo-q95.jpg"/><br/> 38,278 bytes | <img src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/photo-q30.jpg"/><br/> 9,102 bytes |

<br/>

## Scaling

Most of the time it's the best idea to scale bitmap images to the display size - when they are scaled down we transfer unnecessary large data and
when scaled up to a higher resolution they will become blurry because the detail information is missing and the browser will interpolate the missing pixels. Vector images like SVG will look sharp at any resolution because the image is "drawn" from scratch again.

JPEG Bitmap, 30% Quality, 4x size<br/>
Extreme lossy compression results in a small file size but poor image quality with heavy artifacts.<br/>
<img width="1280px" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/diagram-q30.jpg"/>

JPEG Bitmap, 95% Quality, 4x size <br/>
A few compression artifacts especially around letters.<br/>
<img width="1280px" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/diagram-q95.jpg"/>

PNG Bitmap, indexed 16 colors, 4x size <br/>
Reducing the image to 16 colors also reduces the file size but gradients and fonts look weird.<br/>
<img width="1280px" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/diagram-idx16.png"/>

PNG Bitmap, RGB, 4x size <br/>
The best bitmap quality but comes with a large file size.<br/>
<img width="1280px" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/diagram-rgb.png"/>

SVG Vector, 4x size <br/>
Smallest file size and best quality.<br/>
<img width="1280px" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/diagram.svg"/>

<br/>

## Creating and Manipulating Images

There are some tools to generate SVG images but none of them are really comfortable to use, so we created the SVGs on this page with a simple text editor with preview function. Bitmap images are usually not created from scratch but can come from any source, like screenshots, digital cameras, exported from another application, downloaded from the web, etc.

There are a lot of tools available to convert between file formats or encodings. Only a few support generating the indexed color PNG encoding which is the top choice for bitmap images that don't have too many different colors. Our recommendation is to use the free Gimp https://www.gimp.org/ application.

<br/>

## Caching

Images are large and often we don't want to send them over the network every time. So it can be a huge gain in user experience and overall performance to set the caching right. Images like teasers don't contain valuable information and can be stored on the client device for some time instead of transferring again and again. A caching time of several weeks to months is usually appropriate.

<br/>

## Final Considerations

<img width="800px" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/public/assets/images/docs/graphics/image-formats.svg"/>

Choosing an image for use on a web page is a trade-off between file size and quality of display. The file format has the biggest impact on the result. High quality, high resolution bitmap images look very beautiful on the screen but often come as big files that takes very long to load. Always try to keep the file size as small as possible while preserving an acceptable quality for the user. As a rule of thumb, the file size of any image should not exceed 100kB. Whenever the image type allows to use SVG, then use SVG as it usually is the best choice combining the smallest file size together with best image quality.
