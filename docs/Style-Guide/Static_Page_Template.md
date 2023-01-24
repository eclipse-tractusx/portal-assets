## Static Page Template(s)

The static page templates enable the users to build responsive static sites within extremly short time and in line with the CX styling guidelines.
Below you can find an overview of all supported templates as well as the template structure.

### Templates

#### #1 TextCenterAlignedWithCardGrid

Template Name: "TextCenterAlignedWithCardGrid"
<br>

<img width="1080" alt="image" src="https://user-images.githubusercontent.com/94133633/211916164-7e6659c7-10b7-41de-96b9-74e6a7fd6828.png">

<br>

<details>
  <summary>Structure Details</summary>
  
      {
          title: 'Section Title',
          description:
            'description such as an introduction or explaination / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards',
          backgroundColor: '#FFFFFF',
          id: 'business-id',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          grid: 4,
          template: 'TextCenterAlignedWithCardGrid',
          detailsWithImageRow1: [
            {
              title: 'Card Title 1',
              imageUrl:
                'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
              description:
                'Card element description, with limited size.',
              readMore: '/appmarketplace',
              readMoreTitle: 'Details',
              backgroundColor: '#f9f9f9',
              align: 'center',
            },
            {
              title: 'Card Title 2',
              imageUrl:
                'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
              description:
                'Card element description, with limited size.',
              readMore: '',
              backgroundColor: '#f9f9f9',
              align: 'center',
            },
            {
              title: 'Card Title 3',
              imageUrl:
                'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
              description:
                'Card element description, with limited size.',
              readMore: '',
              backgroundColor: '#f9f9f9',
              align: 'center',
            },
            {
              title: 'Card Title 4',
              imageUrl:
                'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
              description:
                'Card element description, with limited size.',
              readMore: '',
              backgroundColor: '#f9f9f9',
              align: 'center',
            },
          ],
        }
  
 </details>
 
 <br>
 <br>


#### #2 TextCenterAlignedWithLinkButtonGrid  

Template Name: "TextCenterAlignedWithLinkButtonGrid"
<br>

<img width="1080" alt="image" src="https://user-images.githubusercontent.com/94133633/211919901-381dcc7b-bd19-4c10-b33a-e2da1c69f8e8.png">


 <details>
   <summary>Structure Details</summary>

        {
        title: 'Direct Links / What Else Do You Need To Know',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
        imageUrl:
          'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
        backgroundColor: '#FFFFFF',
        grid: 2,
        id: 'section-one',
        template: 'TextCenterAlignedWithLinkButtonGrid',
        linksRow1: [
          {
            background: '#C498EF63',
            title: 'Sample Name',
            navigate: '/appmanagement',
          },
          {
            background: '#C498EF63',
            title: 'Sample Name',
            navigate: '/appmanagement',
          },
          ],
        linksRow2: [
          {
            background: '#C498EF63',
            title: 'Sample Name',
            navigate: '/appmanagement',
          },
         ],
        }

  </details>
 
<br>
<br>


#### #3 TextImageSideBySideWithCardGrid 

Template Name: "TextImageSideBySideWithCardGrid"
<br>

<img width="1080" alt="image" src="https://user-images.githubusercontent.com/94133633/211922125-4447c344-0c25-4c3f-859a-df1bc22af3d5.png">

<details>
  <summary>Structure Details</summary>
  
         {
      title: 'Section Title',
      description:
        'description such as an introduction or explaination / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards',
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      backgroundColor: '#FFFFFF',
      id: 'provider-id',
      template: 'TextImageSideBySideWithCardGrid',
      detailsWithImageRow1: [
        {
          title: 'Card Title 1',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          description:
            'description such as an introduction or explaination / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards',
          readMore: '/help',
          readMoreTitle: 'Details',
          backgroundColor: '#F9F9F9',
        },
        {
          title: 'Card Title 2',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          description:
            'description such as an introduction or explaination / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards',
          readMore: '/help',
          backgroundColor: '#F9F9F9',
        },
        {
          title: 'Card Title 3',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
          description:
            'description such as an introduction or explaination / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards - description such as an introduction or explanation / subscription of the following cards',
          readMore: '/help',
          readMoreTitle: 'Details',
          backgroundColor: '#F9F9F9',
        },
      ],
      detailsWithoutImageRow1: [
        {
          title: 'Card Title 1',
          imageUrl:'',
          description: 'Card element description, with limited size.',
          readMore: '',
          readMoreTitle: 'Details',
          backgroundColor: '#FFFFFF',
        },
        {
          title: 'Card Title 2',
          imageUrl: '',
          description: 'Card element description, with limited size.',
          readMore: '',
          readMoreTitle: 'Details',
          backgroundColor: '#FFFFFF',
        },
        {
          title: 'Card Title 3',
          imageUrl: '',
          description: 'Card element description, with limited size.',
          readMore: '',
          readMoreTitle: 'Details',
          backgroundColor: '#FFFFFF',
        },
       ],
      }
  
</details>
 
<br>
<br>


#### #4 TextVideoSideBySide 

Template Name: "TextVideoSideBySide"
<br>

<img width="1080" alt="image" src="https://user-images.githubusercontent.com/94133633/211922780-7e0d8f66-1e0d-4210-baf0-08e322ec1fe6.png">

<details>
  <summary>Structure Details</summary>
  
    {
      title: 'Intro headline',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      videoUrl: 'https://www.youtube.com/embed/g-NVjP2srw4',
      id: 'intro-id',
      backgroundColor: '#FFFFFF',
      template: 'TextVideoSideBySide',
    },
  
</details>
 
<br>
<br>


#### #5 Video-Text-Side-By-Side 

Template Name: "TextVideoSideBySide"
<br>

<img width="1080" alt="image" src="https://user-images.githubusercontent.com/94133633/211922905-875e8531-17b4-467d-8c83-5215a1d86f4d.png">

<details>
  <summary>Structure Details</summary>
  
    {
      title: 'Intro headline',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      videoUrl: 'https://www.youtube.com/embed/g-NVjP2srw4',
      id: 'intro-id',
      backgroundColor: '#FFFFFF',
      template: 'TextVideoSideBySide',
    },
  
</details>
 
<br>
<br>
 
#### #6 Text-Image-Center-Aligned

Template Name: "TextImageCenterAligned"
<br>

<img width="1055" alt="image" src="https://user-images.githubusercontent.com/94133633/211923185-9ed617a1-6149-4795-8e84-ddf7f8a49864.png">

<details>
  <summary>Structure Details</summary>
  
    {
      title: 'How to contribute to traceability and why?',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      backgroundColor: '#F9F9F9',
      id: 'data-id',
      template: 'TextImageCenterAligned',
    },
  
</details>
 
<br>
<br>

#### #7 Text-Center-Aligned

Template Name: "TextCenterAligned"
<br>

<img width="1080" alt="image" src="https://user-images.githubusercontent.com/94133633/211923185-9ed617a1-6149-4795-8e84-ddf7f8a49864.png">

<details>
  <summary>Structure Details</summary>
  
    {
      title: 'How to contribute to traceability and why?',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      backgroundColor: '#F9F9F9',
      id: 'data1-id',
      template: 'TextCenterAligned',
    },
  
</details>

<br>
<br>

#### #8 Text-Image-Side-By-Side

Template Name: "TextImageSideBySide"
<br>

<img width="1080" alt="image" src="https://user-images.githubusercontent.com/94133633/211925359-6b0ad50b-7cba-4ef5-b8a9-27f1b63bff77.png">

<details>
  <summary>Structure Details</summary>
  
    {
      title: 'How to contribute to traceability and why?',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard .",
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      backgroundColor: '#F9F9F9',
      id: 'data2-id',
      template: 'TextImageSideBySide',
    },
  
</details>

<br>
<br>


### Implementation  

To create a new page or enhance an existing page, the following steps need to get performed
<br>

#### New Page creation
If a complete new page with the usage static data templates is planned, the page need to get introduced inside the portal frontend repo as well as inside the asset repo.
The frontend repo is needed to introduce the page, permissions to the page as well as the navigation.

<br>
<br>

#### Enhancing an existing page
For enhancing an existing page, the asset files insidide the asset repo => /public/assets/content/de/.... need to get enhanced.
Please ensure that you extend all language files and not only one.

By adding a new template (as mentioned above) inside the content files, the portal page will get automatically extended by the new content.

<br>
<br>




